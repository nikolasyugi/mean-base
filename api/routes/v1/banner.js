module.exports = function (middlewares, moduleBanner, multer) {

    var auth = middlewares.auth;

    var controllers = moduleBanner.controllers;

    var storage = multer.memoryStorage()
    var upload = multer({ storage: storage });

    return function (router) {

        //Admin panel CRUD


        router.get("/banners", auth.checkLogged, function (req, res) {
            controllers.banner.getBanners(req, res);
        });

        router.get("/banners/:id", auth.checkLogged, function (req, res) {
            controllers.banner.getBanner(req, res);
        });

        router.post("/banners", auth.checkLogged, function (req, res) {
            controllers.banner.createBanner(req, res);
        });

        router.put("/banners/:id", auth.checkLogged, function (req, res) {
            controllers.banner.updateBanner(req, res);
        });

        router.delete("/banners/:id", auth.checkAdmin, function (req, res) {
            controllers.banner.deleteBanner(req, res);
        });


        //API 
        
        router.put("/banner/picture/:id", auth.checkLogged, upload.single("picture"), function (req, res) {
            controllers.banner.updatePicture(req, res);
        });
    }
}