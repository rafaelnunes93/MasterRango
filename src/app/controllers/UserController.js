const User = require('../models/User')

module.exports = {

    registerForm(req,res){
        return res.render("user/register")
    },
    
    async show(req,res){
        const {userId: id} = req.session

        const user = await User.findOne({where:{id} })

        if(!user) return res.redirect("/",{
            error: "Usuario não encontrado!"
        })

        return res.render("user/index", {user})
    }, 

    async post(req,res){

        const userId = await User.create(req.body)

        req.session.userId = userId

        return res.redirect('/users')

    }
    
}