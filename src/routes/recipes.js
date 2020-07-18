const express = require('express');
const routes = express.Router()
const multer = require('../app/middlewares/multer');

const recipesController = require('../app/controllers/RecipeController')
const seachController = require('../app/controllers/SearchController')


//SEARCH
routes.get('/recipes/search', seachController.index)

//WEB RECIPES
routes.get('/create',recipesController.create)
routes.get('/:id/edit',recipesController.edit)
routes.get('/:id',recipesController.show)

routes.post('/',multer.array("photos",6),recipesController.post)
routes.put('/',multer.array("photos",6),recipesController.put)
routes.delete('/',recipesController.delete)



module.exports = routes