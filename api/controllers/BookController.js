/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    destroy: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id passed.');
        }

        Book.destroy(id).exec(function (err, book) {
            if (err) {
                return res.serverError(err);
            }

            return res.ok("Book deleted successfully");
        });
    },

    create: function (req, res) {
        if (!req.body) {
            return res.badRequest('No body data passed.');
        }

        Book.create(req.body).exec(function (err, book) {
            if (err) {
                return res.serverError(err);
            }

            return res.jsonx(book);
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

        Book.update(id, req.body).exec(function (err, book) {
            if (err) {
                return res.serverError(err);
            }

            return res.jsonx(book);
        });
    },

    find: function (req, res) {
        Book.find({}).sort({createdAt: -1}).limit(4).exec(function (err, books) {
            if (err) {
                return res.serverError(err);
            }

            res.view('index', {books: books});
        });
    }
};