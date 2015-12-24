FlowRouter.route('/', {
	name: 'main',
	action() {
		BlazeLayout.render('DisplayLayout');
	}
});

FlowRouter.route('/input', {
  name: 'input',
  action() {
    BlazeLayout.render('InputLayout');
  }
});
