module.exports = function (keys, schemas, uidgen, transporter, passport, bcrypt, modules) {

    var User = schemas.User;
    return {

        isLogged: function (req, res) {
            if (req.user && req.user.role == 'admin') return res.json({ response: true })
            else return res.json({ response: false })
        },

        signup: function (req, res) {

            var userData = req.body;
            userData.role = 'common';
            User.create(userData, function (err, user) {
                if (err) return res.json(err);
                else {
                    req.login(user, function (err) {
                        if (err) { return next(err); }
                        return res.json(user.mapUser())
                    });
                }
            });

        },

        logout: function (req, res) {
            req.logout()
            return res.json({ message: "You've been logged out" })
        },

        sign_in: function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.status(400).json(info) }
                if (user.role == 'admin') {
                    req.login(user, function (err) {
                        if (err) { return next(err); }
                        return res.json(user.mapUser())
                    });
                } else {
                    return res.status(400).json({ err: 'You are not authorized' })
                }

            })(req, res, next);

        },

        login: function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.status(400).json(info) }
                req.login(user, function (err) {
                    if (err) { return next(err); }
                    return res.json(user.mapUser())
                });
            })(req, res, next);
        },

        changePassword: function (req, res) { //change admin password

            var user = res.locals.user;
            var oldPassword = req.body.oldPassword;
            var password = req.body.password;
            var confirm_password = req.body.confirm_password;

            if (oldPassword != password) {
                if (password.length >= 8) {
                    if (confirm_password == password) {
                        if (bcrypt.compareSync(oldPassword, req.user.password)) {


                            bcrypt.hash(password, 10).then(hash => {
                                password = hash;
                                User.findOneAndUpdate({ _id: user._id }, { password: password }, function (err) {
                                    if (err) return res.json({ err: err })
                                    return res.json({ message: 'Password Changed' });
                                })
                            });
                        } else {
                            return res.status(400).json({ err: 'Old password is incorrect' })
                        }
                    } else {
                        return res.status(400).json({ err: 'Password and passowrd confirmation are different' })
                    }
                } else {
                    return res.status(400).json({ err: 'Password length must be greater than 8' })
                }
            } else {
                return res.status(400).json({ err: 'New and old password are the same' })
            }
        },

        resetPassword: function (req, res) {
            var email = req.body.email;
            var email_token = uidgen.generateSync();

            User.findOne({ email: email }, function (err, user) {
                if (err) throw err;
                else {
                    if (!user) { //user not found
                        var mailOptions = {
                            from: '"Contato" <' + keys.configEmail.email + '>',
                            to: email,
                            subject: keys.projectName + ' - Recuperação de senha',
                            text: 'Infelizmente não encontramos um usuário no sistema cadastrado com o seu e-mail!'
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                return console.log(error);
                            }
                            return res.json({ message: 'Email sent' });
                        });
                    } else { //user found 
                        var mailOptions = {
                            from: '"Contato" <' + keys.configEmail.email + '>',
                            to: email,
                            subject: keys.projectName + ' - Recuperação de senha',
                            text: 'Para recuperar sua senha clique no seguinte link: ' + keys.apiUrl + '/resetPassword?code=' + email_token
                        };
                        user.new_password_token = email_token;
                        user.new_password_token_generated = new Date();
                        user.save(function (err, userUpdated) {
                            if (err) throw err;
                            else {
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        return console.log(error);
                                    }
                                    return res.json({ message: 'Email sent' });
                                });
                            }
                        });
                    }
                }
            });
        },

        updatePassword: function (req, res) { //change users password

            var code = req.body.code;
            var newPassword = req.body.password
            Date.prototype.addHours = function (h) {
                this.setTime(this.getTime() + (h * 60 * 60 * 1000));
                return this;
            }

            if (code) {
                User.findOne({ new_password_token: code }, function (err, user) {
                    if (err) throw err;
                    else {
                        if (!user) { //user with that code not found
                            return res.status(400).json({ message: "Código Inválido" })
                        } else if (Math.abs(user.new_password_token_generated.addHours(1) - new Date()) < 0) { //(generated + 1h) < now ? true = expired
                            return res.status(400).json({ message: "Código Expirado" })
                        } else { //user found and not expired
                            user.new_password_token_generated = null
                            user.new_password_token = null
                            user.password = newPassword;
                            user.save(function (err, userUpdated) {
                                if (err) throw err;
                                else return res.json(userUpdated.mapUser());
                            });
                        }
                    }
                });
            } else { //normal change password
                if (req.user && req.user.role != "admin") {
                    req.user = req.body.password;
                    user.save(function (err, userUpdated) {
                        if (err) throw err;
                        else return res.json(userUpdated.mapUser());
                    });
                } else {
                    res.status(400).send({ err: "You are not authenticated!" })
                }
            }
        }


    }
}