/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    destroy: function (req, res) {
        req.logout();
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id passed.');
        }

        User.destroy(id).exec(function (err, user) {
            if (err) {
                return res.serverError(err);
            }

            return res.ok("User deleted successfully");
        });
    },

    adminOnly: function (req, res) {
        User.find({admin: true}).exec(function (err, users) {
            if (err) {
                return res.serverError(err);
            }

            return res.jsonx(users);
        });
    },

    update: function (req, res) {
        if (!req.body) {
            return res.badRequest('No body data passed.');
        }

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id passed.');
        }

        User.update(id, req.body).exec(function (err, user) {
            if (err) {
                return res.serverError(err);
            }

            return res.jsonx(user);
        });
    },

    signup: function (req, res) {
        if (!req.body) {
            return res.badRequest('No body data passed.');
        }

        var email = req.param("email");
        var password = req.param("password");
        var firstName = req.param("firstName");
        var lastName = req.param("lastName");
        var name = firstName + " " + lastName;

        User.findOne({"email": email}).exec(function(err, user) {
            if (err) {
                return res.badRequest('DB error.');
            }
            else {
                if (user == undefined) {
                    var hasher = require("password-hash");
                    password = hasher.generate(password);

                    User.create({email: email, name: name, password: password}).exec(function (err, user) {
                        if (err) return res.negotiate(err);
                        req.login(user, function (err){
                            if (err) return res.negotiate(err);
                            return res.redirect('/');
                        });
                    });
                }
                else {
                    return res.send(400, 'That email has already been taken!');
                }
            }
        });
    },

    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};