const express = require('express');
const routes = express.Router()
const recipesController = require('./app/controllers/RecipeController')



routes.get('/',function(req, res){
    return res.render("layout.njk");
})

routes.get('/recipes/create',recipesController.create)
routes.post('/recipes',recipesController.post)


routes.get('/ads/create',function(req,res){
    return res.redirect("/recipes/create")
})



module.exports = routes