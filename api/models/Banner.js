module.exports = function (mongoose) {

	var Schema = mongoose.Schema;

	var bannerSchema = new Schema({
		name: { type: String, required: true },
		from: String,
		to: String,
		url: String,
		picture: String,
	});

	// on every save, add the date
	bannerSchema.pre('save', function (next) {
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

	bannerSchema.methods.mapBanner = function () {
		return {
			id: this.id,
			name: this.name,
			from: this.from,
			to: this.to,
			url: this.url,
			picture: this.picture == null? null : this.picture
		};
	};


	var Banner = mongoose.model('Banner', bannerSchema);

	return Banner;

}