Students = new Mongo.Collection('students');

// Allow everything for easier development
Students.allow({
	insert: function(userId, doc) {
		//return !!userId; //checks if userId exists
		return true;
	}
});

ExamSchema = new SimpleSchema({
	examName: {
		type: String,
		label: "Exam Name"
	},
	earnedScore: {
		type: Number,
		label: "Score"
	},
	maxScore: {
		type: Number,
		label: "Max Score"
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
	exams: {
		type: [ExamSchema],
		label: "Exams"
	},
	sumEarnedScore: {
		type: Number,
		label: "Sum of Earned Exam Scores",
		autoValue: function() {
			var sum = 0;
			for (var i = 0; i < this.field("exams").value.length; i++) {
				sum += this.field("exams").value[i].earnedScore;
			}
			return sum;
		}
	},
	sumExamMaxScore: {
		type: Number,
		label: "Sum of Max Exam Scores",
		autoValue: function() {
			var sum = 0;
			for (var i = 0; i < this.field("exams").value.length; i++) {
				sum += this.field("exams").value[i].maxScore;
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

var student1 = {
	firstName: "Jason",
	lastName: "Lim",
	school: "Aragon",
	grade: 12,
	exams: [
		{
			examName: "Exam 1",
			earnedScore: 5,
			maxScore: 6
		},
		{
			examName: "Exam 2",
			earnedScore: 3,
			maxScore: 6
		}
	],
	updatedAt: null
}

StudentSchema.clean(student1);

Students.insert(student1);
