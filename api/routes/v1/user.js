module.exports = function (middlewares, moduleUser) {

    var auth = middlewares.auth;

    var controllers = moduleUser.controllers;

    return function (router) {

        router.post("/signup", function (req, res) {
            controllers.auth.signup(req, res);
        });

        router.post("/sign_in", function (req, res, next) {
            controllers.auth.sign_in(req, res, next);
        });

        router.post("/login", function (req, res, next) {
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

    }
}