const { unlinkSync } = require('fs')
const { hash } = require('bcryptjs')

const User = require('../models/User')
const Recipe = require('../models/Recipe')


module.exports = {

    registerForm(req, res) {
        return res.render("user/register")
    },

    async show(req, res) {
        try {
            const { userId: id } = req.session

            const user = await User.findOne({ where: { id } })

            if (!user) return res.redirect("/", {
                error: "Usuario não encontrado!"
            })

            return res.render("user/index", { user })

        } catch (error) {
            console.error(error)
        }

    },

    async post(req, res) {

        try {

            let { name, email, password } = req.body

            password = await hash(password, 8)

            const userId = await User.create({
                name,
                email,
                password
            })

            req.session.userId = userId

            return res.redirect('/users')

        } catch (error) {
            console.error(error)
        }

    },

    async edit(req, res) {

        const { user } = req


        return res.render("user/edit", { user })

    },

    async update(req, res) {

        try {
            const { user } = req
            let { name, email } = req.body

            await User.update(user.id, {
                name,
                email
            })

            return res.render("user/edit", {
                user: req.body,
                success: "Conta Atualizada com Sucesso!"
            })


        } catch (error) {
            console.error(error)
            return res.render("user/edit", {
                error: "Algum erro aconteceu!"
            })
        }
    },

    async delete(req, res) {


        try {

            //pegar todas as receitas
            const recipes = await Recipe.findAll({ where: { user_id: req.body.id } })

            //pegar todas as imagens
            const allFilesPromise = recipes.map(recipe =>
                Recipes.files(recipe.id))

            let promiseResults = await Promise.all(allFilesPromise)


            //     //remover o usuario
            await User.delete(req.body.id)
            req.session.destroy()


            //     //remover as  imagens das pastas
            promiseResults.map(results => {
                results.rows.map(file => {
                    try {
                        unlinkSync(file.path)
                    } catch (error) {
                        console.error(error)
                    }

                })

            })

            return res.render("session/login", {
                success: "Conta deletada com sucesso!"
            })

        } catch (error) {
            console.error(error)
            return res.render("user/index", {
                user: req.body,
                error: "Erro ao tentar deletar sua conta!"
            })
        }



    }

}