module.exports = function (middlewares, moduleUser){

    var auth = middlewares.auth;

	var controllers = moduleUser.controllers;

  	return function(router){
    	router.post("/signup", function(req, res){
    		controllers.auth.signup(req, res);
    	});

    	router.post("/login", function(req, res){
    		controllers.auth.login(req, res);
    	});

        router.get("/user", auth.checkToken,  function(req, res){
            controllers.user.get(req, res);
        });

        router.put("/user", auth.checkToken,  function(req, res){
            controllers.user.put(req, res);
        });

        router.put("/change-password", auth.checkToken,  function(req, res){
            controllers.auth.changePassword(req, res);
        });

        router.post("/reset-password",  function(req, res){
            controllers.auth.resetPassword(req, res);
        });

        router.get("/confirm-password-email/:email_token",  function(req, res){
            controllers.auth.confirmPasswordEmail(req, res);
        });
    }
  	

}