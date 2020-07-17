const Category = require('../models/Category')
const Recipe = require('../models/Recipe')
const File = require('../models/File');

module.exports = {   

   async index(req , res){

    try {
        let results,
        params = {}

        const {filter, category} = req.query

        if(!filter) return res.redirect("/")

        params.filter = filter

        if(category){
            params.category = category
        }

        results = await Recipe.search(params)

        async function getImage(recipesId){
            let results = await Recipe.files(recipesId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)

            return files[0]
        }

        const recipesPromise =  results.rows.map(async recipe =>{
            recipe.img = await getImage(recipe.id)
            return recipe
        })

        const recipes = await Promise.all(recipesPromise)

        const search = {
            term: req.query.filter,
            total:recipes.lenght
        }

        const categories = recipes.map(recipe => ({
            id: recipe.category_id,
            name: recipe.category_name
        })).reduce((categoriesFiltered,category) =>{

            const found = categoriesFiltered.some(cat => cat.id == category.id)

            if(!found)
            categoriesFiltered.push(category)

            return categoriesFiltered
        },[])


        return res.render("search/index", {recipes, search,categories})

    } catch (error) {

        console.error(error)
    }

       

    },
}