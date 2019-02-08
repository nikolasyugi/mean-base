module.exports = function (schemas, uidgen, keys, AWS) {

    var User = schemas.User;

    AWS.config.update({
        accessKeyId: keys.configAWS.accessKeyId,
        secretAccessKey: keys.configAWS.secretAccessKey,
        region: keys.configAWS.region
    })
    var s3 = new AWS.S3();
    var bucketName = keys.configAWS.bucketName;

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

        updatePicture: function (req, res) {

            var user = req.user;

            User.findOne({ _id: user._id }, function (err, user) {

                if (req.file) {
                    var img = req.file.buffer;
                    var imageName = req.file.originalname;
                    var fileType = imageName.split('.')
                    var length = fileType.length
                    fileType = fileType[length - 1].toLowerCase()
                    var contentType = ""
                    if (fileType == 'jpg') contentType = "image/jpg"
                    else if (fileType == 'jpeg') contentType = "image/jpeg"
                    else if (fileType == 'png') contentType = "image/png"
                    else return res.status(400).json({ message: "You uploaded a ." + fileType + " file, but the picture must be either .jpeg, .jpg or .png" })
                    var imageName = uidgen.generateSync() + '.' + fileType;

                    if (user.picture) {
                        var params = {
                            Bucket: bucketName,
                            Key: 'mean_base/' + user.picture.split('/mean_base/')[1],
                        };
                        s3.deleteObject(params, function (err, data) {
                            if (err) {
                                console.log(err, err.stack);
                            } else {
                                var data = {
                                    Bucket: bucketName,
                                    Key: 'mean_base/' + imageName,
                                    Body: img,
                                    ACL: 'public-read',
                                    ContentType: contentType
                                };
                                s3.putObject(data, function (err, data) {
                                    if (err) {
                                        res.status(500).json({ error: "Error -> " + err });
                                    } else {
                                        var imgUrl = "https://" + keys.configAWS.bucketName + '.s3.' + keys.configAWS.region + ".amazonaws.com/mean_base/" + imageName;

                                        user.picture = imgUrl
                                        user.save(function (err, userUpdated) {
                                            if (err) throw err;
                                            else res.send(userUpdated.mapUser());
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        var data = {
                            Bucket: bucketName,
                            Key: 'mean_base/' + imageName,
                            Body: img,
                            ACL: 'public-read',
                            ContentType: contentType
                        };
                        s3.putObject(data, function (err, data) {
                            if (err) {
                                res.status(500).json({ error: "Error -> " + err });
                            } else {
                                var imgUrl = "https://" + keys.configAWS.bucketName + '.s3.' + keys.configAWS.region + ".amazonaws.com/mean_base/" + imageName;

                                user.picture = imgUrl
                                user.save(function (err, userUpdated) {
                                    if (err) throw err;
                                    else res.send(userUpdated.mapUser());
                                });
                            }
                        });
                    }
                } else {
                    return res.json({ message: 'No file has been uploaded' })
                }
            })
        },

        getAbout: function (req, res) {
            return res.json(req.user.mapUser())
        }
    }
}