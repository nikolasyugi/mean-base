module.exports = function (middlewares, moduleFaq) {

    var auth = middlewares.auth;

    var controllers = moduleFaq.controllers;

    return function (router) {

        //Admin panel CRUD


        router.get("/faqs", auth.checkLogged, function (req, res) {
            controllers.faq.getFaqs(req, res);
        });

        router.get("/faqs/:id", auth.checkLogged, function (req, res) {
            controllers.faq.getFaq(req, res);
        });

        router.post("/faqs", auth.checkLogged, function (req, res) {
            controllers.faq.createFaq(req, res);
        });

        router.put("/faqs/:id", auth.checkLogged, function (req, res) {
            controllers.faq.updateFaq(req, res);
        });

        router.delete("/faqs/:id", auth.checkAdmin, function (req, res) {
            controllers.faq.deleteFaq(req, res);
        });


        //API 
        
    }
}