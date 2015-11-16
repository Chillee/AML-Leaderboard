Meteor.subscribe('students');

Template.Leaderboard.helpers({
	students: ()=> {
		return Students.find({});
	}
});
