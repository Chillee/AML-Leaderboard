Students= new Mongo.Collection('students');

Students.allow({
	insert: function(userId, doc){
		return !!userId; //checks if userId exists
	}
})

/*Score = new SimpleSchema({
	examName: {
		type: String
	},
	userScore: {
		type: Number
	},
	maxScore: {
		type: Number
	}
});

StudentsSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	school: {
		type: String,
		label: "School"
	},
	grade: {
		type: Number,
		label: "Grade"
	},
	scores: {
		type: [Score]
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function(){
			return new Date();
		},
		autoform: {
			type: "hidden"
		}
	}
<<<<<<< HEAD:collections/students.js
});*/
