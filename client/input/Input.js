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
                    matchAll: false,
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
                    matchAll: false,
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
    'autocompleteselect #school': function(event, template, doc){
        $('.-autocomplete-container').remove();
    },
    'submit form': function(event){
        event.preventDefault();
        query = {firstName: $('#firstName').val(), school: $('#school').val()};
        x = Students.find(query);
        console.log(x.count());
        if (x.count() == 0){
            new_student = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                school: $('#school').val(),
                grade: parseInt($('#grade').val()),
                exam1: parseInt($('#exam1').val()),
                exam2: parseInt($('#exam2').val()),
                exam3: parseInt($('#exam3').val()),
                exam4: parseInt($('#exam4').val()),
                exam5: parseInt($('#exam5').val())

            };
            StudentSchema.clean(new_student);
            Students.insert(new_student);
        } else{
            updated_student = Students.findOne(query);
            Students.update(updated_student._id, {
                $set: {
                    lastName: $('#lastName').val(),
                    grade: parseInt($('#grade').val()),
                    exam1: parseInt($('#exam1').val()),
                    exam2: parseInt($('#exam2').val()),
                    exam3: parseInt($('#exam3').val()),
                    exam4: parseInt($('#exam4').val()),
                    exam5: parseInt($('#exam5').val())
                }
            });

        }
        // console.log(x.fetch(), x.fetch().length);
        
        $('#firstName,#lastName,#exam1,#exam2,#exam3,#exam4,#exam5').val('');
        $('#firstName').focus();

        console.log("form submitted");
    }
});



[
    
 "Bowditch",
 "Abbott",
 "Bayside",
 "Borel",
 "Castilleja",
 "Harvest Park",
 "Synapse"
].forEach(function (school_name) {
    Schools.insert({name: school_name});
});