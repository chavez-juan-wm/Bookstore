var jwt = require('jsonwebtoken');

exports.verifyOrdinaryUser = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
        jwt.verify(token, secretKey, function(err, decoded){
            if(err){
                err = new Error("You are not authenticated!");
                err.status = 401;
                return next(err);
            }
            else{
                req.decoded = decoded;
                next();
            }
        });
    }
    else{
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function(req, res, next){
    if(req.decoded._doc.admin){
        return next();
    }
    else{
        var err = new Error("You are not authorized to perform this operation!");
        err.status = 403;
        return next(err);
    }
};