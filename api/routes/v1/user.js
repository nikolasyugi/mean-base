module.exports = function (middlewares, moduleUser) {

    var auth = middlewares.auth;

    var controllers = moduleUser.controllers;

    return function (router) {
        router.post("/signup", function (req, res) {
            controllers.auth.signup(req, res);
        });

        router.post("/sign_in", auth.local, function (req, res) {
            controllers.auth.sign_in(req, res);
        });

        router.post("/login", auth.local, function (req, res) {
            controllers.auth.login(req, res);
        });

        router.post("/logout", auth.checkLogged, function (req, res) {
            controllers.auth.logout(req, res);
        });

        router.post("/isLogged", auth.checkLogged, function (req, res) {
            controllers.auth.isLogged(req, res);
        })

        router.get("/users", auth.checkAdmin, function (req, res) {
            controllers.user.get(req, res);
        });

        router.get("/users/:id", auth.checkLogged, function (req, res) {
            controllers.user.get(req, res);
        });

        router.put("/users/:id", auth.checkLogged, function (req, res) {
            controllers.user.put(req, res);
        });

        router.delete("/users/:id", auth.checkLogged, function (req, res) {
            controllers.user.put(req, res);
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
    }


}