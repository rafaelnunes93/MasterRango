const Category = require('../models/Category')
const Recipe = require('../models/Recipe')
const File = require('../models/File');

module.exports = {
    create(req,res){

         //Pegar Categorias
         Category.all()
         .then(function(results){
 
             const categories = results.rows
 
             return res.render("recipes/create.njk",{ categories })
         }).catch(function(err){
 
             throw new Error(err);
             
         })
    },

    async post(req,res){
        //Logica de Salvar

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] ==""){
                return res.send('Por Favor, Preencha todos os campos!')
            }
        }

        if(req.files.length == 0)
            return res.send('Por Favor, Envie pelo menos uma imagem.')
     

        let results = await Recipe.create(req.body)
        const recipesId = results.rows[0].id

        const filesPromise = req.files.map(file =>
            File.create({name: file.filename, path: file.path, recipes_id:recipesId }))
       await Promise.all(filesPromise)


            //lembrar de mudar para redirecionar para a pagina inicial (Index)
        return res.redirect(`/recipes/${recipesId}/edit`)

    },

    async edit(req,res){
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("recipe not found")       

        results = await Category.all()
        const categories = results.rows

        return res.render("recipes/edit.njk",{recipe,categories})
    },

    async put(req,res){


        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] ==""){
                return res.send('Please, fill all fields!')
            }
        }       

        await Recipe.update(req.body)

        return res.redirect(`recipes/${req.body.id}/edit`)

    },


    async delete(req,res){
        await Recipe.delete(req.body.id)

        return res.redirect('/recipes/create')
    }


}