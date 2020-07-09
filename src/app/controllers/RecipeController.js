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
            if(req.body[key] == ""){
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

        // get categorias 
        results = await Category.all()
        const categories = results.rows

        // get images
        results = await Recipe.files(recipe.id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }))

        return res.render("recipes/edit.njk",{recipe,categories,files})
    },

    async put(req,res){


            // const keys = Object.keys(req.body)

            // for(key of keys){
            //     if(req.body[key] ==""){
            //         return res.send('Please, fill all fields!')
            //     }
            // }       

        if(req.files.length != 0){
            const newFilesPromise = req.files.map(file =>
                    File.create({...file, recipes_id: req.body.id }))

                    await Promise.all(newFilesPromise)
        }

        if(req.body.removed_files){
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(id => File.delete(id))

            await Promise.all(removedFilesPromise)
        }

        await Recipe.update(req.body)

        return res.redirect(`recipes/${req.body.id}/edit`)

    },


    async delete(req,res){
        await Recipe.delete(req.body.id)

        return res.redirect('/recipes/create')
    }


}