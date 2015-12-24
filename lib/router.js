FlowRouter.route('/', {
	name: 'main',
	action() {
		BlazeLayout.render('MainLayout');
	}
});

FlowRouter.route('/input', {
  name: 'input',
  action() {
    BlazeLayout.render('InputLayout');
  }
});
