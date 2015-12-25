Schools= new Mongo.Collection(null);
Template.Input.helpers({
	settings: function() {
		if (this.field == 'school'){
			return {
				position: 'bottom',
				limit: 10,
				rules: [{
					collection: Schools,
					field: 'name',
					matchAll: true,
					template: Template.schoolAutocomplete
				}]
			};
		} else {
			return {
				position: 'bottom',
				limit: 10,
				rules: [{
					collection: Students,
					field: this.field,
					matchAll: true,
					template: Template.standard
				}]
			};
		}
	},
});

Template.Input.events({
	"autocompleteselect #firstName,#lastName": function(event, template, doc){
		$('.-autocomplete-container').remove();
		$('#firstName').val(doc.firstName);
		$('#lastName').val(doc.lastName);
		$('#school').val(doc.school);
		$('#grade').val(doc.grade);
		$('#exam1').val(doc.exam1 != -1 ? doc.exam1 : '');
		$('#exam2').val(doc.exam2 != -1 ? doc.exam2 : '');
		$('#exam3').val(doc.exam3 != -1 ? doc.exam3 : '');
		$('#exam4').val(doc.exam4 != -1 ? doc.exam4 : '');
		$('#exam5').val(doc.exam5 != -1 ? doc.exam5 : '');
	},
	'submit form': function(event){
		event.preventDefault();
		$('#firstName,#lastName,#exam1,#exam2,#exam3,#exam4,#exam5').val('');
		console.log("form submitted");
	}
});



[
	{
		name: "Bowditch"
	},
	{
		name: "Abbott"
	},
	{
		name: "Bayside"
	},
	{
		name: "Borel"
	},
	{
		name: "Castilleja"
	},
	{
		name: "Harvest Park"
	},
	{
		name: "Synapse"
	}
].forEach(function (obj) {
	Schools.insert(obj);
});