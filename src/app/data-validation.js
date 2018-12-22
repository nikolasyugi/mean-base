dataValidation = {
	cardBrand:
		function (target) {
			let amex = /^3[47]\d{13,14}$/
			let dinersclub = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/
			let discover = /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/
			let jcb = /^(?:2131|1800|35\d{3})\d{11}$/
			let maestro = /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/
			let mastercard = /^5[1-5][0-9]{14}$/
			let visa = /^4[0-9]{12}(?:[0-9]{3})?$/

			let regexArray = [amex, dinersclub, discover, jcb, maestro, mastercard, visa];
			let brandsArray = ['amex', 'dinersclub', 'discover', 'jcb', 'maestro', 'mastercard', 'visa'];
			let brand = "default";

			regexArray.forEach(function (item, i) {
				if (item.test(target)) {
					brand = brandsArray[i];
					return;
				}

			});

			return brand;

		},
	//console.log(cardBrand());



	/**************************************************************************************************************/
	/**************************************************************************************************************/




	onlyLetters:
		function (str) {
			let regex = /[A-Za-z.]+/;
			let regexN = /[a-zA-Z.'\u00C0-\u00FF ]+/i;

			if (regexN.test(str) == false) {
				return false;
			}
			else if (regexN.exec(str)[0].length < regexN.exec(str).input.length) {
				return false;
			}
			else {
				return true;
			}
		},

	//console.log(onlyLetters('José O'neal S. Da Conceição'));




	/**************************************************************************************************************/
	/**************************************************************************************************************/




	validateEmail:
		function (email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		},

	// console.log(validateEmail('a@aco'));




	/**************************************************************************************************************/
	/**************************************************************************************************************/





	validateCpf:
		function (cpf) {
			var re = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
			return re.test(String(cpf));
		},

	// console.log(validateCpf('41728608856'));




	/**************************************************************************************************************/
	/**************************************************************************************************************/

	validateDob:
		function (dob) { //31122000
			var re = /^\s*(3[01]|[12][0-9]|0?[1-9])(1[012]|0?[1-9])((?:19|20)\d{2})\s*$/
			today = new Date()
			var isDate = re.test(String(dob));
			var isValid = false;

			if (parseInt(dob.substr(4,6)) < parseInt(today.getFullYear())) { //if year < current year
				var isValid = true; //is already valid
			} else if (parseInt(dob.substr(4,6)) == parseInt(today.getFullYear()) && parseInt(dob.substr(2,2)) < parseInt(today.getMonth() + 1)) { // if year = current year and month < current month
				var isValid = true; //is valid
			}
			return (isDate && isValid);
		},




	/**************************************************************************************************************/
	/**************************************************************************************************************/

	validateExpire:
		function (date) {//122020
			today = new Date()
			var re = /^\s*(1[012]|0?[1-9])((?:19|20)\d{2})\s*$/
			var isDate = re.test(String(date));
			// console.log('year', parseInt(date.substr(2, 4)))
			// console.log('current year',parseInt(date.substr(2, 4)) >  parseInt(today.getFullYear()))
			var isValid = false;
			if (parseInt(date.substr(2, 4)) > parseInt(today.getFullYear())) { //if year > current year
				var isValid = true; //is already valid
			} else if (parseInt(date.substr(2, 4)) == parseInt(today.getFullYear()) && parseInt(date.substr(0, 2)) >= parseInt(today.getMonth() + 1)) { // if year = current year and month >= current month
				var isValid = true; //is valid
			}
			return (isDate && isValid);
		},




	/**************************************************************************************************************/
	/**************************************************************************************************************/

	validateDate:
		function (date) {//12122020 until 12/12/2099
			var re = /^\s*(3[01]|[12][0-9]|0?[1-9])(1[012]|0?[1-9])((?:19|20)\d{2})\s*$/

			return re.test(String(date));
		},
}


module.exports = dataValidation;