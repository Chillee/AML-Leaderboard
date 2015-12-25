Template.Input.helpers({
	settings: function() {
		return {
			position: 'bottom',
			limit: 10,
			rules: [
			{
				collection: Students,
				field: this.field,
				matchAll: true,
				template: Template.standard
			}]
		}
	}
})

Template.Input.events({
	"autocompleteselect input": function(event, template, doc){
		$('.-autocomplete-container').remove();
		$('#firstName').val(doc.firstName);
		$('#lastName').val(doc.lastName);
	}
})