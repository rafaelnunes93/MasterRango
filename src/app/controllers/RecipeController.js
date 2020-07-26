const { unlinkSync } = require('fs')

const Category = require('../models/Category')
const Recipe = require('../models/Recipe')
const File = require('../models/File');

module.exports = {
    async create(req,res){
        try {
            const categories = await Category.findAll()
            return res.render("recipes/create",{ categories })            
        } catch (error) {
            console.error(error)
        }
    },

    async post(req,res){

        try {
             //Logica de Salvar

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Por Favor, Preencha todos os campos!')
            }
        }

        if(req.files.length == 0)
            return res.send('Por Favor, Envie pelo menos uma imagem.')

            const { category_id, title, ingredients, preparation , description, 
            quantity,time, status , dificulty} = req.body

            const recipes_id = await Recipe.create({
                category_id,
                user_id:req.session.userId, 
                title,
                ingredients:[{ingredients}],
                preparation,
                description,
                quantity,
                time,
                status,
                dificulty
            })

        const filesPromise = req.files.map(file =>
            File.create({name: file.filename, path: file.path, recipes_id }))
       await Promise.all(filesPromise)


            //lembrar de mudar para redirecionar para a pagina inicial (Index)
        return res.redirect(`/recipes/${recipes_id}`)
            
        } catch (error) {
            console.error(error)
        }       

    },

    async show(req,res){

        try {
            let recipes = await Recipe.find(req.params.id)

            if(!recipes) return res.send("Receita nao encontrada")

            let files = await Recipe.files(recipes.id)
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
            }))

            return res.render("recipes/show",{recipes, files})            
        } catch (error) {
            console.error(error)
        }        
    },

    async edit(req,res){

        try {
            const recipe = await Recipe.find(req.params.id)

            if(!recipe) return res.send("recipe not found")       

            // get categorias 
            const categories = await Category.findAll()

            // get images
            let files = await Recipe.files(recipe.id)
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
            }))

            return res.render("recipes/edit",{recipe,categories,files})
            
        } catch (error) {
            console.error(error)
        }

        
    },

    async put(req,res){

        try {

            const keys = Object.keys(req.body)

            for(key of keys){
                if(req.body[key] =="" && key != "removed_files"){
                    return res.send('Please, fill all fields!')
                }
            }       

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

            await Recipe.update(req.body.id ,{
                category_id: req.body.category_id,
                title: req.body.title,
                ingredients: req.body.ingredients,
                preparation: req.body.preparation,
                description: req.body.description,
                quantity: req.body.quantity,
                time: req.body.time,
                status: 0,
                dificulty: req.body.dificulty
            })

            return res.redirect(`recipes/${req.body.id}`)
            
        } catch (error) {
            console.error(error)
        }

    },


    async delete(req,res){
        await Recipe.delete(req.body.id)

        return res.redirect('/recipes/create')
    }


}