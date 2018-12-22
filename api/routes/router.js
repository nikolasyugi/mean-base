module.exports = function(express, routes){
    return function (app){
        
        //Route version 1
        var route_v1 = express.Router();
        for(key in routes.v1){
            routes.v1[key](route_v1);
        }

        return function(){
            app.use('/api/v1', route_v1);
        }
    }
}