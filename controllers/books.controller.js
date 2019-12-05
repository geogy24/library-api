var models = require('../models');
var booksSerializer = require('../serializers/books.serializer');

module.exports.index = (_request, response, _next) => {
  models.Book.findAll().then((items) => response.json(booksSerializer.serialize(items)));
}
