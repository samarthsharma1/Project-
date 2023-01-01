const sequelize = require('sequelize');

const db =  new sequelize("translate", "root", "S@marth12", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = db;