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
	scores: {
		type: [Score]
	},
	school: {
		type: String,
		label: "School"
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