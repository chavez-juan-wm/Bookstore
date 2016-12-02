/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'text',
      required: true
    },
    email: {
      type: 'text',
      required: true
    },
    password: {
      type: 'text',
      required: true
    },
    admin: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    }
  }
};