Meteor.startup(function() {
  Meteor.subscribe('students');
  Session.set("sortTotalScore", -1);
  Session.set("sortFirstName", 1);
  Session.set("sortLastName", 1);
  Session.set("sortSchool", 1)
  Session.set("sortGrade", 1);
  Session.set("sortExam1", -1);
  Session.set("sortExam2", -1);
  Session.set("sortExam3", -1);
  Session.set("sortExam4", -1);
  Session.set("sortExam5", -1);
  Session.set("sort_by", {totalScore: Session.get("sortTotalScore")});
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

Template.leaderboard.helpers({
  students: function() {
    var rankList = getRankList();
    return Students.find({}, {
      sort: Session.get("sort_by"),
      transform: function(student) {
        student.rank = rankList[student.totalScore.toString()];
        for (var i = 1; i <= 5; i++) {
          if (student["exam" + i.toString()] < 0) {
            student["exam" + i.toString()] = "n/a";
          }
        }
        return student;
      }
    });
	}
});

Template.leaderboard.events({
  'click .sortTotalScore': function() {
    Session.set("sortTotalScore", -Session.get("sortTotalScore"));
    Session.set("sort_by", {
      totalScore: Session.get("sortTotalScore"),
      firstName: Session.get("sortFirstName"),
      lastName: Session.get("sortLastName")
    });
  },
  'click .sortFirstName': function() {
    Session.set("sortFirstName", -Session.get("sortFirstName"));
    Session.set("sort_by", {
      firstName: Session.get("sortFirstName"),
      totalScore: Session.get("sortTotalScore")
    });
  },
  'click .sortLastName': function() {
    Session.set("sortLastName", -Session.get("sortLastName"));
    Session.set("sort_by", {
      lastName: Session.get("sortLastName"),
      totalScore: Session.get("sortTotalScore")
    });
  },
  'click .sortSchool': function() {
    Session.set("sortSchool", -Session.get("sortSchool"));
    Session.set("sort_by", {
      school: Session.get("sortSchool"),
      totalScore: Session.get("sortTotalScore")
    });
  },
  'click .sortGrade': function() {
    Session.set("sortGrade", -Session.get("sortGrade"));
    Session.set("sort_by", {
      grade: Session.get("sortGrade"),
      totalScore: Session.get("sortTotalScore")
    });
  },
  'click .sortExam1': function() {
    Session.set("sortExam1", -Session.get("sortExam1"));
    Session.set("sort_by", {
      exam1: Session.get("sortExam1"),
      totalScore: Session.get("sortTotalScore")
    });
  },
  'click .sortExam2': function() {
    Session.set("sortExam2", -Session.get("sortExam2"));
    Session.set("sort_by", {
      exam2: Session.get("sortExam2"),
      totalScore: Session.get("sortTotalScore")
    });
  },
  'click .sortExam3': function() {
    Session.set("sortExam3", -Session.get("sortExam3"));
    Session.set("sort_by", {
      exam3: Session.get("sortExam3"),
      totalScore: Session.get("sortTotalScore")
    });
  },
  'click .sortExam4': function() {
    Session.set("sortExam4", -Session.get("sortExam4"));
    Session.set("sort_by", {
      exam4: Session.get("sortExam4"),
      totalScore: Session.get("sortTotalScore")
    });
  },
  'click .sortExam5': function() {
    Session.set("sortExam5", -Session.get("sortExam5"));
    Session.set("sort_by", {
      exam5: Session.get("sortExam5"),
      totalScore: Session.get("sortTotalScore")
    });
  }
});
