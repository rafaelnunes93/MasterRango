const User = require('../models/User')

module.exports = {

    registerForm(req,res){
        return res.render("user/register")
    },
    
    async show(req,res){
        const {userId: id} = req.session

        const user = await User.findOne({where: {id} })

        if(!user) return res.redirect("/",{
            error: "Usuario não encontrado!"
        })

        return res.render("user/index", {user})
    }, 

    async post(req,res){

        const userId = await User.create(req.body)

        req.session.userId = userId

        return res.redirect('/users')

    },

    async edit(req,res){

        const { user } = req      


        return res.render("user/edit", {user})

    },

    async update(req,res){

        try {
                const {user} = req
                let{name,email} = req.body

                await User.update(user.id,{
                    name,
                    email
                })

                return res.render("user/edit",{
                    user:req.body,
                    success: "Conta Atualizada com Sucesso!"
                })

            
        } catch (error) {
            console.error(error)
            return res.render("user/edit",{
                error:"Algum erro aconteceu!"
            })
        }
    },

    async delete(req,res){
        try {

            await User.delete(req.body.id)
            req.session.destroy()

            return res.render("session/login",{
                success: "Conta deletada com sucesso!"
            })
                
        } catch (error) {
            console.error(error)
                return res.render("user/index",{
                    user: req.body,
                    error:"Erro ao tentar deletar sua conta!"
                })            
        }
    }
    
}