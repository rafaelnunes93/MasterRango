const express = require('express');
const routes = express.Router()
const homeController = require('../app/controllers/HomeController')



const users = require('./users');
const recipes = require('./recipes');

routes.use('/users',users)
routes.use('/recipes',recipes)

//HOME RECIPES

routes.get('/',homeController.index);
routes.get('/receitas',homeController.listadereceitas)


routes.use('/recipes' ,recipes)
routes.use('/users',users)




//ALIAS
routes.get('/ads/create',function(req,res){
    return res.redirect("/recipes/create")
})

routes.get('/accounts',function(req,res){
    return res.redirect("/users/register")
})


module.exports = routes