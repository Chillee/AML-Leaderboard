Meteor.startup(function() {
  Meteor.subscribe('students');
  Session.set("sort_by", {sumEarnedScore: -1, lastName: 1, firstName: 1});
});

function getRankList() {
  var rankList = {}, prvScore = -1, idx = 1;
  Students.find({}, {sort: {sumEarnedScore: -1}}).forEach(function(student) {
    if (prvScore != student.sumEarnedScore) {
      prvScore = student.sumEarnedScore;
      rankList[student.sumEarnedScore.toString()] = idx;
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
        student.rank = rankList[student.sumEarnedScore.toString()];
        return student;
      }
    });
	}
});

Template.sortings.events({
  'click .sortTotal': function() {
    Session.set("sort_by", {sumEarnedScore: -1, lastName: 1, firstName: 1});
  },
  'click .sortFirstName': function() {
    Session.set("sort_by", {firstName: 1, lastName: 1, sumEarnedScore: -1});
  },
  'click .sortLastName': function() {
    Session.set("sort_by", {lastName: 1, firstName: 1, sumEarnedScore: -1});
  },
  'click .sortGrade': function() {
    Session.set("sort_by", {
      grade: 1, sumEarnedScore: -1, lastName: 1, firstName: 1});
  }
});
