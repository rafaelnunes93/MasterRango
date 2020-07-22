const express = require('express');
const routes = express.Router()
const multer = require('../app/middlewares/multer');

const recipesController = require('../app/controllers/RecipeController')
const seachController = require('../app/controllers/SearchController')

const {onlyUsers, onlyAdmin} = require('../app/middlewares/session')



//SEARCH
routes.get('/recipes/search', seachController.index)

//WEB RECIPES
routes.get('/create',onlyUsers,recipesController.create)
routes.get('/:id/edit',onlyUsers,recipesController.edit)
routes.get('/:id',recipesController.show)

routes.post('/',onlyUsers,multer.array("photos",6),recipesController.post)
routes.put('/',onlyUsers,multer.array("photos",6),recipesController.put)
routes.delete('/',onlyUsers,recipesController.delete)



module.exports = routes