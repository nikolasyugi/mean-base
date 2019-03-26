module.exports = function (middlewares, moduleUser, multer) {

    var auth = middlewares.auth;

    var controllers = moduleUser.controllers;

    var storage = multer.memoryStorage()
    var upload = multer({ storage: storage });

    return function (router) {

        //Account and Authorization

        router.post("/signup", function (req, res) {
            controllers.auth.signup(req, res);
        });

        router.post("/sign_in", function (req, res, next) { //admin sign in
            controllers.auth.sign_in(req, res, next);
        });

        router.post("/login", function (req, res, next) { //normal user sign in
            controllers.auth.login(req, res, next);
        });

        router.post("/logout", auth.checkLogged, function (req, res) {
            controllers.auth.logout(req, res);
        });

        router.put("/changePassword", auth.checkLogged, function (req, res) {
            controllers.auth.changePassword(req, res);
        });

        router.post("/resetPassword", function (req, res) {
            controllers.auth.resetPassword(req, res);
        });

        router.get("/confirm-password-email/:email_token", function (req, res) {
            controllers.auth.confirmPasswordEmail(req, res);
        });





        //Admin panel CRUD

        router.get("/users/super_users", auth.checkAdmin, function (req, res) {
            controllers.user.getSuperUsers(req, res);
        });

        router.get("/users/super_users/:id", auth.checkAdmin, function (req, res) {
            controllers.user.getSuperUser(req, res);
        });

        router.post("/users/super_users", auth.checkAdmin, function (req, res) {
            controllers.user.createSuperUser(req, res);
        });

        router.put("/users/super_users/:id", auth.checkAdmin, function (req, res) {
            controllers.user.updateSuperUser(req, res);
        });

        router.delete("/users/super_users/:id", auth.checkAdmin, function (req, res) {
            controllers.user.deleteSuperUser(req, res);
        });

        router.get("/users", auth.checkLogged, function (req, res) {
            controllers.user.getUsers(req, res);
        });

        router.get("/users/:id", auth.checkLogged, function (req, res) {
            controllers.user.getUser(req, res);
        });

        router.post("/users", auth.checkLogged, function (req, res) {
            controllers.user.createUser(req, res);
        });

        router.put("/users/:id", auth.checkLogged, function (req, res) {
            controllers.user.updateUser(req, res);
        });

        router.delete("/users/:id", auth.checkAdmin, function (req, res) {
            controllers.user.deleteUser(req, res);
        });




        //API

        router.get("/user/isLogged", function (req, res) {
            controllers.auth.isLogged(req, res);
        });

        router.put("/user/picture/:id", auth.checkLogged, upload.single("picture"), function (req, res) {
            controllers.user.updatePicture(req, res);
        });

        router.get("/user/about", auth.checkLogged, function (req, res) {
            controllers.user.getAbout(req, res);
        });

        router.put("/user/password", function (req, res) {
            controllers.auth.updatePassword(req, res);
        });
    }
}