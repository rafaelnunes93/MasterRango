const express = require('express');
const routes = express.Router()
const recipesController = require('./app/controllers/RecipeController')



routes.get('/',function(req, res){
    return res.render("layout.njk");
})

//WEB
routes.get('/recipes/create',recipesController.create)
routes.get('/recipes/:id/edit',recipesController.edit)


routes.post('/recipes',recipesController.post)
routes.put('/recipes',recipesController.put)
routes.delete('/recipes',recipesController.delete)



//ALIAS
routes.get('/ads/create',function(req,res){
    return res.redirect("/recipes/create")
})



module.exports = routes