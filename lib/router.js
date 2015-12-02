FlowRouter.route('/', {
	name: 'main',
	action() {
		console.log("wtf");
		BlazeLayout.render('MainLayout');
	}
});

FlowRouter.route('/leaderboard', {
  name: 'leaderboard',
  action() {
    console.log("routing to leaderboard");
    BlazeLayout.render('leaderboard.html');
  }
});
