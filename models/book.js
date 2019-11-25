'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    isbn: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    resume: {
      type: DataTypes.TEXT,
      validate: {
        notNull: false
      }
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
