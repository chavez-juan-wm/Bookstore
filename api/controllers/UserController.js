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

            return res.ok("Deleted successfully");
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

    create: function (req, res) {
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
                    User.create(req.body).exec(function (err, user) {
                        if (err) {
                            return res.serverError(err);
                        }

                        return res.jsonx(user);
                    });
                }
                else {
                    return res.badRequest('That email has already been taken!');
                }
            }
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

    login: function(req, res){
        var email = req.param("email");
        var password = req.param("password");

        User.findOne({"email": email}).exec(function(err, user) {
            if (err) {
                return res.badRequest('DB error.');
            } else {
                if (user != undefined) {
                    if (password == user.password) {
                        req.session.authenticated = true;
                        res.jsonx(user);
                    }
                    else {
                        return res.badRequest('Wrong password.');
                    }
                }
                else {
                    return res.badRequest('User not found.');
                }
            }
        });
    }
};

