var jwt = require('jsonwebtoken');
var secretKey = '12345-67890-09876-54321';

module.exports = function(req, res, next){
    var token = req.headers['x-access-token'] || req.query.token;

    if(token){
        jwt.verify(token, secretKey, function(err, decoded){
            if(err){
                err = new Error("You are not authenticated!");
                err.status = 401;
                return next(err);
            }
            else{
                User.findOne({ email: decoded.email }).exec(function (err, user){
                    if (err) { return done(err); }

                    if(user.admin){
                        return next();
                    }
                    else{
                        err = new Error("You are not authorized to perform this operation!");
                        err.status = 403;
                        return next(err);
                    }

                });
            }
        });
    }
    else{
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};