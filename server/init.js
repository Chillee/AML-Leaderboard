Meteor.startup(function(){
	Students.remove({});
});	
Accounts.config({
    forbidClientAccountCreation: true
})