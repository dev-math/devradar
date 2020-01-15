const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//para listar os devs
routes.get('/devs', DevController.index);
//para cadastrar os devs
routes.post('/devs', DevController.store);

//buscar os devs na barra de busca
routes.get('/search', SearchController.index);

module.exports = routes;