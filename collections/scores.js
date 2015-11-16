Scores = new Mongo.Collection('scores');

Scores.allow({
	insert: function(userId, doc){
		return !!userId;
	}
})

Score = new SimpleSchema({
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

ScoresSchema = new SimpleSchema({
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
});
