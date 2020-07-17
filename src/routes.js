const express = require('express');
const routes = express.Router()
const recipesController = require('./app/controllers/RecipeController')
const homeController = require('./app/controllers/HomeController')
const seachController = require('./app/controllers/SearchController')
const multer = require('./app/middlewares/multer');



routes.get('/',homeController.index);

routes.get('/receitas',homeController.listadereceitas)


//SEARCH
routes.get('/recipes/search', seachController.index)

//WEB RECIPES
routes.get('/recipes/create',recipesController.create)
routes.get('/recipes/:id/edit',recipesController.edit)
routes.get('/recipes/:id',recipesController.show)

routes.post('/recipes',multer.array("photos",6),recipesController.post)
routes.put('/recipes',multer.array("photos",6),recipesController.put)
routes.delete('/recipes',recipesController.delete)

//ALIAS
routes.get('/ads/create',function(req,res){
    return res.redirect("/recipes/create")
})



module.exports = routes