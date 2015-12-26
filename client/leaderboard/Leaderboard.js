function setDefaultSortOptions() {
  Session.set("sort_totalScore", -1);
  Session.set("sort_firstName", 1);
  Session.set("sort_lastName", 1);
  Session.set("sort_school", 1)
  Session.set("sort_grade", 1);
  Session.set("sort_exam1", -1);
  Session.set("sort_exam2", -1);
  Session.set("sort_exam3", -1);
  Session.set("sort_exam4", -1);
  Session.set("sort_exam5", -1);
}

Meteor.startup(function() {
  Meteor.subscribe('students');
  setDefaultSortOptions();
  Session.set("sort_current", "totalScore");
  Session.set("sort_by", {totalScore: Session.get("sort_totalScore")});
});

function getRankList() {
  var rankList = {}, prvScore = -1, idx = 1;
  Students.find({}, {sort: {totalScore: -1}}).forEach(function(student) {
    if (prvScore != student.totalScore) {
      prvScore = student.totalScore;
      rankList[student.totalScore.toString()] = idx;
    }
    ++idx;
  });
  return rankList;
}

Template.Leaderboard.helpers({
  students: function() {
    var rankList = getRankList();
    return Students.find({}, {
      sort: Session.get("sort_by"),
      transform: function(student) {
        student.rank = rankList[student.totalScore.toString()];
        for (var i = 1; i <= 5; i++) {
          if (student["exam" + i.toString()] === null) {
            student["exam" + i.toString()] = "n/a";
          }
        }
        return student;
      }
    });
	},
  arrow: function(sortParam) {
    if (Session.get("sort_current") == sortParam) {
      if (  !(sortParam == "totalScore") 
              != //XOR
            !(Session.get("sort_" + sortParam) == -1)   ) {
        return "&#8613;";
      } else {
        return "&#8615;";
      }
    } else {
      return "";
    }
  }
});

function toggleSort(sortParam) {
  if (Session.get("sort_current") != sortParam) {
    setDefaultSortOptions();
    Session.set("sort_current", sortParam);
  } else {
    Session.set("sort_" + sortParam, -Session.get("sort_" + sortParam));
  }
}

function setSort(sortParam) {
  toggleSort(sortParam);
  var sort_by = {}
  sort_by[sortParam] = Session.get("sort_" + sortParam);
  sort_by["totalScore"] = Session.get("sort_totalScore");
  Session.set("sort_by", sort_by);
}

Template.Leaderboard.events({
  'click .sort_totalScore': function() {
    toggleSort("totalScore");
    Session.set("sort_by", {
      totalScore: Session.get("sort_totalScore"),
      firstName: Session.get("sort_firstName"),
      lastName: Session.get("sort_lastName")
    });
  },
  'click .sort_firstName': function() { setSort("firstName"); },
  'click .sort_lastName': function() { setSort("lastName"); },
  'click .sort_school': function() { setSort("school"); },
  'click .sort_grade': function() { setSort("grade"); },
  'click .sort_exam1': function() { setSort("exam1"); },
  'click .sort_exam2': function() { setSort("exam2"); },
  'click .sort_exam3': function() { setSort("exam3"); },
  'click .sort_exam4': function() { setSort("exam4"); },
  'click .sort_exam5': function() { setSort("exam5"); }
});
