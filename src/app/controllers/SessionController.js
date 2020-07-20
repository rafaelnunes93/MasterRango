const crypto = require('crypto')
const User = require('../models/User')
const mailer = require('../../lib/mailer')

module.exports = {

    loginForm(req,res){

        return res.render("session/login")
    },

    login(req,res){
        //deslogar o usurio, destrei a sessao
        req.session.userId = req.user.id

        return res.redirect("/")
    },

    logout(req,res){
        //deslogar o usurio, destrei a sessao
        req.session.destroy()

        return res.redirect("/")
    },

    forgotForm(req,res){
      
        return res.render("session/forgot-password")
    },

    async forgot(req,res){
        const user = req.user

        //Um tokem para o Usuario recuperar a senha
        const token =  crypto.randomBytes(20).toString("hex")

        //Tempo para expiração do token
        let now = new Date();
        now = now.setHours(now.getDate() + 2)

        await User.update(user.id,{
            reset_token: token,
            reset_token_expires: now
        })
        
        //enviar um email com um link de recuperação
        await mailer.sendMail({
            to:user.email,
            from:'no-reply@masterrango.com.br',
            subject:'Recuperação de senha',
            html: ` 
                <h2>Perdeu a Chave?</h2>
                <p>Não se preocupe, clique no link abaixo para recuperar a senha</p>

                <p>
                    <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                        RECUPERAR SENHA
                    </a>
                
                </p>
            `,
        })    


        //avisar  o usuario que o email foi enviado
        return res.render("session/forgot-password", {
            success: "Verifique o email cadastrado para resetar sua senha !"
        })
    

    }
}