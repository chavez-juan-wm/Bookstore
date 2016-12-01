/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    destroy: function (req, res) {
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

        User.findOne({"email": email}).exec(function(err, user) {
            if (err) {
                return res.badRequest('DB error.');
            }
            else {
                if (user == undefined) {
                    User.create(req.params.all()).exec(function (err, user) {
                        if (err) return res.negotiate(err);
                        req.login(user, function (err){
                            if (err) return res.negotiate(err);
                            return res.redirect('/welcome');
                        });
                    });
                }
                else {
                    return res.badRequest('That email has already been taken!');
                }
            }
        });
    },

    login: function(req, res){
        //res.login({
        //    successRedirect: '/',
        //    failureRedirect: '/user/login'
        //});

        return res.login({
            successRedirect: '/'
        });
    },

    logout: function(req, res){
        req.logout();
        return res.ok('Logged out successfully.');
    }
};

