const User = require('../models/User')
const { compare } = require('bcryptjs')

//////////////////////////////////////////////////////////////////////////////////////////////
async function login(req,res,next){

    const {email ,password} = req.body

        const user = await User.findOne({ where:{ email } })

        if(!user) return res.render("session/login",{
            user:req.body,
            error: "Usuario não Cadastrado!"
        })
       
        const passed = await compare(password, user.password)

        if(!passed) return res.render("session/login",{
            user: req.body,
            error: "Senha incorreta."
        })
    
        req.user = user
    
        next()

       
        
}

async function forgot(req,res,next){
    const { email } = req.body

    try {
        let user = await User.findOne({ where:{ email } })

        if(!user) return res.render("session/forgot-password",{
            user:req.body,
            error: "Email não Cadastrado!!"
        })

        req.user = user

    next()


    } catch (error) {
       console.error(error) 
    }

}


async function reset(req,res,next){
    const {email ,password,passwordRepeat,token } = req.body

    const user = await User.findOne({ where:{ email } })

    // VERIFICA SE O USUARIO ESTA CADASTRADO
    if(!user) return res.render("session/password-reset",{
        user:req.body,
        token,
        error: "Usuario não Cadastrado!"
    })

   // VERIFICA SE SENHA E A REPETIÇÃO DE SENHA ESTÂO IGUAIS
    if(password != passwordRepeat)
    return res.render('session/password-reset',{
        user: req.body,
        token,
        error: 'Os campos senha e repeticão de senha estão diferentes!'
    })

    //VERIFICA SE O TOKEN É VALIDO
    if(token != user.reset_token)
    return res.render('session/password-reset',{
        user: req.body,
        token,
        error: 'TOKEN INVALIDO, SOLICITE UMA NOVA RECUPERAÇÂO DE SENHA'
    })

    //VERIFICA SE O TOKEN NÂO EXPIROU
    let now = new Date()
    now = now.setHours(now.getHours())

    if(now > user.reset_token_expires) return res.render('session/password-reset',{
        user: req.body,
        token,
        error: 'Token expirado, Por Favor,solicite outro!'
    })

    req.user = user
    next()
}

module.exports = {
    login,
    forgot,
    reset
}