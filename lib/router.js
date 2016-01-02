FlowRouter.route('/', {
	name: 'display',
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
