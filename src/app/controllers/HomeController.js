const Category = require('../models/Category')
const Recipe = require('../models/Recipe')
const File = require('../models/File');

module.exports = {

    async listadereceitas(req , res){
        let results = await Recipe.all()
        const recipes = results.rows

        if(!recipes) return res.send("NENHUMA RECEITA ENCONTRADA")

        async function getImage(recipesId){
            let results = await Recipe.files(recipesId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)

            return files[0]
        }

        const recipesPromise = recipes.map(async recipe =>{
            recipe.img = await getImage(recipe.id)
            return recipe
        })

        const lastAdded = await Promise.all(recipesPromise)

        return res.render("allRecipes/listadereceitas", {recipes : lastAdded})

    },

   async index(req , res){
    let results = await Recipe.all()
    const recipes = results.rows

    if(!recipes) return res.send("NENHUMA RECEITA ENCONTRADA")

    async function getImage(recipesId){
        let results = await Recipe.files(recipesId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)

        return files[0]
    }

    const recipesPromise = recipes.map(async recipe =>{
        recipe.img = await getImage(recipe.id)
        return recipe
      })//.filter((recipe,index) => index > 2 ? false : true)

    const lastAdded = await Promise.all(recipesPromise)

        return res.render("home/index", {recipes : lastAdded})

    },
}