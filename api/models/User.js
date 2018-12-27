module.exports = function (mongoose, bcrypt) {

	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		name: { type: String, required: true },
		password: {
			type: String, required: true, validate: {
				validator: function (p) {
					return p.length >= 8;
				},
				message: props => `Password length must be greater than 8!`
			},
		},
		email: {
			type: String, required: true, unique: true, validate: {
				validator: function (email) {
					var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return re.test(String(email).toLowerCase());
				},
				message: props => `${props.value} is not a valid e-mail`
			},
		},
		role: String,
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