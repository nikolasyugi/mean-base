module.exports = function (mongoose) {

	var Schema = mongoose.Schema;

	var faqSchema = new Schema({
		position: Number,
		question: String,
		answer: String,
	});

	// on every save, add the date
	faqSchema.pre('save', function (next) {
		// get the current date
		var currentDate = new Date();

		// change the updated_at field to current date
		this.updated_at = currentDate;
		// if created_at doesn't exist, add to that field
		if (!this.created_at) {
			this.created_at = currentDate;
		}

		next();
	});

	faqSchema.methods.mapFaq = function () {
		return {
			id: this.id,
			position: this.position,
			question: this.question,
			answer: this.answer,
		};
	};


	var Faq = mongoose.model('Faq', faqSchema);

	return Faq;

}