const Recipe = require('../models/Recipe')

module.exports = {

    async listadereceitas(req , res){
        const recipes = await Recipe.findAll()

        if(!recipes) return res.send("NENHUMA RECEITA ENCONTRADA")

        async function getImage(recipesId){
            let files = await Recipe.files(recipesId)
            files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)

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
    const recipes = await Recipe.findAll()

    if(!recipes) return res.send("NENHUMA RECEITA ENCONTRADA")

    async function getImage(recipesId){
        let files = await Recipe.files(recipesId)
        files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)

        return files[0]
    }

    const recipesPromise = recipes.map(async recipe =>{
        recipe.img = await getImage(recipe.id)
        return recipe
      }).filter((recipe,index) => index > 9 ? false : true)

    const lastAdded = await Promise.all(recipesPromise)

        return res.render("home/index", {recipes : lastAdded})

    },
}