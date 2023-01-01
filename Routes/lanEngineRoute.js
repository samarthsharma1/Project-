const express = require('express');
const Router = express.Router();

const Controller = require('../Controller/lanEngineController');

// controller 
Router.post('/change',Controller.searchDb , Controller.translateWord)


module.exports = Router;