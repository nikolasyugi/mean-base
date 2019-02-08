module.exports = function (schemas, redis) {

    var User = schemas.User;

    return {
        getSuperUsers: function (req, res) {

            User.find({ role: "admin", email: { $ne: "admin@gmail.com" }, _id: { $ne: req.user._id } }, function (err, users) {
                if (err) throw err;
                else {
                    array = []
                    users.forEach(u => {
                        array.push(u.mapUser())
                    });
                    res.json(array);
                }
            });
        },

        getSuperUser: function (req, res) {

            User.findOne({ role: "admin", _id: req.params.id }, function (err, user) {
                if (err) throw err;
                else {
                    if (!user) return res.status(404).json({ err: "User not found" })
                    else res.json(user.mapUser())
                }
            });
        },

        createSuperUser: function (req, res) {
            var u = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: 'admin'
            })

            u.save(function (err, user) {
                if (err) throw err;
                else res.send(user.mapUser());
            });
        },

        updateSuperUser: function (req, res) {

            User.findOne({ role: "admin", _id: req.params.id }, function (err, user) {
                if (err) throw err;
                else {
                    if (!user) return res.status(404).json({ err: "User not found" })
                    else user.name = req.body.name;
                    user.save(function (err, userUpdated) {
                        if (err) throw err;
                        else return res.json(userUpdated.mapUser());
                    });
                }
            });
        },

        deleteSuperUser: function (req, res) {

            User.findOneAndDelete({ role: "admin", _id: req.params.id }, function (err) {
                if (err) throw err;
                else return res.json({});
            });
        },

        getUsers: function (req, res) {

            User.find({ role: { $ne: "admin" } }, function (err, users) {
                if (err) throw err;
                else {
                    array = []
                    users.forEach(u => {
                        array.push(u.mapUser())
                    });
                    res.json(array);
                }
            });
        },

        getUser: function (req, res) {

            User.findOne({ role: { $ne: "admin" }, _id: req.params.id }, function (err, user) {
                if (err) throw err;
                else {
                    if (!user) return res.status(404).json({ err: "User not found" })
                    else res.json(user.mapUser());
                }
            });
        },

        createUser: function (req, res) {

            var u = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: 'common'
            })

            u.save(function (err, user) {
                if (err) throw err;
                else res.send(user.mapUser());
            });
        },

        updateUser: function (req, res) {
            User.findOne({ role: { $ne: "admin" }, _id: req.params.id }, function (err, user) {
                if (err) throw err;
                else {
                    if (!user) return res.status(404).json({ err: "User not found" })
                    else user.name = req.body.name;
                    user.save(function (err, userUpdated) {
                        if (err) throw err;
                        else res.send(userUpdated.mapUser());
                    });
                }
            });
        },

        deleteUser: function (req, res) {

            User.findOneAndDelete({ role: { $ne: "admin" }, _id: req.params.id }, function (err, user) {
                if (err) throw err;
                else res.send({});
            });
        },

    }
}