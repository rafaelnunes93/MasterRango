const express = require('express');
const routes = express.Router()
const recipesController = require('./app/controllers/RecipeController')
const multer = require('./app/middlewares/multer');



routes.get('/',function(req, res){
    return res.render("layout.njk");
})

//WEB
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