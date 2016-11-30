/**
 * Book.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'text',
      required: true
    },
    author: {
      type: 'text',
      required: true
    },
    type: {
      type: 'text',
      required: true
    },
    publisher: {
      type: 'text',
      required: true
    },
    publishedDate: {
      type: 'date',
      required: true
    },
    coverImage: {
      type: ''
    }
  }
};