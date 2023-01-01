const db = require('../database/database');
const sequelize = require('sequelize');

const translationTable = db.define('translationTable', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    sourceLang: sequelize.STRING,
    sourceText: sequelize.STRING,
    
    targetLang: sequelize.STRING,
    targetText:sequelize.STRING
}); 

module.exports = translationTable;