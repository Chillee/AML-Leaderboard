FlowRouter.route('/', {
	name: 'main',
	action() {
		console.log("wtf");
		BlazeLayout.render('MainLayout');
	}
});
