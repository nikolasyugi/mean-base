module.exports = function (schemas, uidgen, keys, AWS) {

    var Banner = schemas.Banner;

    AWS.config.update({
        accessKeyId: keys.configAWS.accessKeyId,
        secretAccessKey: keys.configAWS.secretAccessKey,
        region: keys.configAWS.region
    })
    var s3 = new AWS.S3();
    var bucketName = keys.configAWS.bucketName;

    return {

        getBanners: function (req, res) {

            Banner.find({}, function (err, banners) {
                if (err) throw err;
                else {
                    array = []
                    banners.forEach(u => {
                        array.push(u.mapBanner())
                    });
                    res.json(array);
                }
            });
        },

        getBanner: function (req, res) {

            Banner.findOne({_id: req.params.id }, function (err, banner) {
                if (err) throw err;
                else {
                    if (!banner) return res.status(404).json({ err: "Banner not found" })
                    else res.json(banner.mapBanner());
                }
            });
        },

        createBanner: function (req, res) {

            var u = new Banner({
                name: req.body.name,
                from: req.body.from,
                to: req.body.to,
                url: req.body.url,
            })

            u.save(function (err, banner) {
                if (err) throw err;
                else res.send(banner.mapBanner());
            });
        },

        updateBanner: function (req, res) {
            Banner.findOne({_id: req.params.id }, function (err, banner) {
                if (err) throw err;
                else {
                    if (!banner) return res.status(404).json({ err: "Banner not found" })
                    else {
                        banner.name = req.body.name;
                        banner.from = req.body.from;
                        banner.to = req.body.to;
                        banner.url = req.body.url;
                    }
                    banner.save(function (err, bannerUpdated) {
                        if (err) throw err;
                        else res.send(bannerUpdated.mapBanner());
                    });
                }
            });
        },

        deleteBanner: function (req, res) {

            Banner.findOneAndDelete({_id: req.params.id }, function (err, banner) {
                if (err) throw err;
                else res.send({});
            });
        },

        updatePicture: function (req, res) {
            var id = ""
            if (req.params.id) {
                id = req.params.id
            }
            else {
                return res.status(400).json({ message: 'Missing id parameter' })
            }
            
            Banner.findOne({ _id: id }, function (err, banner) {

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

                    if (banner.picture) {
                        var params = {
                            Bucket: bucketName,
                            Key: 'mean_base/' + banner.picture.split('/mean_base/')[1],
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

                                        banner.picture = imgUrl
                                        banner.save(function (err, bannerUpdated) {
                                            if (err) throw err;
                                            else res.send(bannerUpdated.mapBanner());
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

                                banner.picture = imgUrl
                                banner.save(function (err, bannerUpdated) {
                                    if (err) throw err;
                                    else res.send(bannerUpdated.mapBanner());
                                });
                            }
                        });
                    }
                } else {
                    return res.json({ message: 'No file has been uploaded' })
                }
            })
        }

    }
}