module.exports = function (keys, schemas, uidgen, transporter, passport, bcrypt) {

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

        changePassword: function (req, res) {

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

            var mailOptions = {
                from: '"Contato" <' + keys.configEmail.email + '>',
                to: email,
                subject: keys.projectName + ' - Pedido de nova senha',
                text: 'Para pedir uma nova senha clique no seguinte link: ' + keys.apiUrl + '/api/v1/confirm-password-email/' + email_token
            };

            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    throw err;
                }
                else {
                    if (!user) return res.status(404).json({ err: "User not found" })
                    else {
                        user.new_password_token = email_token;
                        user.save(function (err, userUpdated) {
                            if (err) throw err;
                            else {
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        return console.log(error);
                                    }
                                    return res.json({ success: true, message: 'Email sent' });
                                });
                            }
                        });
                    }
                }
            })
        },

        confirmPasswordEmail: function (req, res) {

            var emailToken = req.params.email_token;

            var newPassword = uidgen.generateSync();

            User.findOne({ new_password_token: emailToken }, function (err, user) {
                if (err) throw err;
                else {
                    if (!user) return res.status(404).json({ err: "User not found" })
                    else {
                        var mailOptions = {
                            from: '"Contato" <' + keys.configEmail.email + '>',
                            to: user.email,
                            subject: keys.projectName + ' - Nova Senha',
                            text: 'Sua nova senha é ' + newPassword
                        };
                        user.password = newPassword;
                        user.save(function (err, userUpdated) {
                            if (err) throw err;
                            else {
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        return console.log(error);
                                    }
                                    return res.send('A sua nova senha foi enviada para o seu e-mail!');
                                });
                            }
                        });
                    }
                }
            });

        }


    }
}