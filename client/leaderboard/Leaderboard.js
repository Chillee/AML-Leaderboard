Meteor.startup(function() {
  Meteor.subscribe('students');
  Session.set("sort_by", {sumEarnedScore: -1, lastName: 1, firstName: 1});
});

Template.leaderboard.helpers({
	students: function() {
    return Students.find({}, {sort: Session.get("sort_by")});
	}
});

Template.leaderboard.events({
  'click input.sortFirstName': function () {
    Session.set("sort_by", {lastName: 1, firstName: 1, sumEarnedScore: -1});
  },
  'click input.sortLastName': function () {
    Session.set("sort_by", {firstName: 1, lastName: 1, sumEarnedScore: -1});
  },
  'click input.sortTotal': function () {
    Session.set("sort_by", {sumEarnedScore: -1, lastName: 1, firstName: 1});
  }
});
