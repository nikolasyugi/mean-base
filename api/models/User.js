module.exports = function (mongoose, bcrypt) {

	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		name: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		role: String,
		token: String,
		token_update: String,
		new_password_token: String,
		created_at: Date,
		updated_at: Date
	});

	// on every save, add the date and hash password
	userSchema.pre('save', function (next) {
		// get the current date
		var currentDate = new Date();

		// change the updated_at field to current date
		this.updated_at = currentDate;
		// if created_at doesn't exist, add to that field
		if (!this.created_at) {
			this.created_at = currentDate;
		}

		//hash password
		if (this.password != undefined) {
			return bcrypt.hash(this.password, 10)
				.then(hash => {
					this.password = hash;
				})
				.catch(err => {
					throw new Error();
				});
		}


		next();
	});

	userSchema.methods.mapUser = function () {
		return {
			name: this.name,
			email: this.email
		};
	};

	userSchema.methods.verifyPassword = function (passwordSent) {
		return bcrypt.compareSync(passwordSent, this.password);
	};

	var User = mongoose.model('User', userSchema);

	return User;

}