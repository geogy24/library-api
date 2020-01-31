"use strict";
module.exports =  ( sequelize, DataTypes ) => {
	const Subject = sequelize.define( "Subject", {
		name: DataTypes.STRING
	}, {} );
	Subject.associate = function( models ) {
		// associations can be defined here
		Subject.hasMany( models.Book, {  foreignKey: "subjectId",  targetKey: "id" } );
	};
	return Subject;
};