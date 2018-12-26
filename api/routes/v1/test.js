module.exports = function (middlewares, moduleTest){

	var auth = middlewares.auth;
  
  	var controllers = moduleTest.controllers;

	  
  	return function(router){
		  router.get("/test", function(req, res){
    		controllers.test.get(req, res);
		});
		
    	router.get("/testAuth", auth.local, function(req, res){
    		controllers.test.get(req, res);
    	});
  	}

}