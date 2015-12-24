Students = new Mongo.Collection('students');

// Allow everything for easier development
Students.allow({
	insert: function(userId, doc) {
		//return !!userId; //checks if userId exists
		return true;
	}
});

StudentSchema = new SimpleSchema({
	firstName: {
		type: String,
		label: "First Name"
	},
	lastName: {
		type: String,
		label: "Last Name"
	},
	school: {
		type: String,
		label: "School"
	},
	grade: {
		type: Number,
		label: "Grade"
	},
	exam1: {
		type: Number,
		label: "Exam 1",
		defaultValue: -1
	},
	exam2: {
		type: Number,
		label: "Exam 2",
		defaultValue: -1
	},
	exam3: {
		type: Number,
		label: "Exam 3",
		defaultValue: -1
	},
	exam4: {
		type: Number,
		label: "Exam 4",
		defaultValue: -1
	},
	exam5: {
		type: Number,
		label: "Exam 5",
		defaultValue: -1
	},
	totalScore: {
		type: Number,
		label: "Sum of Earned Exam Scores",
		autoValue: function() {
			var sum = 0;
			for (var i = 1; i <= 5; i++) {
				if (this.field("exam" + i.toString()).value > 0) {
					sum += this.field("exam" + i.toString()).value;
				}
			}
			return sum;
		}
	},
	updatedAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date();
		},
		autoform: {
			type: "hidden"
		}
	}
});

function randomID() {
    var text = "", possible = "qwertyuiopasdfghjklzxcvbnm";
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var student1 = {
	firstName: randomID(),
	lastName: randomID(),
	school: randomID(),
	grade: Math.floor(Math.random() * 13),
	exam1: Math.floor(Math.random() * 7),
	updatedAt: null
}
for (var i = 2; i <= 5; i++) {
	if (Math.random() < 0.5) {
		student1["exam" + i.toString()] = Math.floor(Math.random() * 7);
	}
}

StudentSchema.clean(student1);

Students.insert(student1);
