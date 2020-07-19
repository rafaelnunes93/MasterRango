const User = require('../models/User')
const { compare } = require('bcryptjs')

function checkAllFields(body){
    const keys = Object.keys(body)

     for(key of keys){
         if(body[key] == ""){
             return {
                user:body,
                error:'Preencha todos os Campos'
            }
       
         }
     }

}


async function post(req, res , next){
    //check se todos os campos estao preenchidos
const fillAllFields = checkAllFields(req.body)

if(fillAllFields){
    return res.render('user/register', fillAllFields)
}

//check se o usuario ja existe (email)

let {email, password , passwordRepeat} = req.body
const user = await User.findOne({
    where: {email}

})

if(user) return res.render('user/register',{
    user: req.body,
    error: 'Ja existe um usuario cadastrado com o email informado!'
})

//check se a senha e a repedicao de senha converem

if(password != passwordRepeat)
    return res.render('user/register',{
        user: req.body,
        error: 'Os campos senha e repeticão de senha estão diferentes!'
    })

    next()
}
//////////////////////////////////////////////////////////////////////////////////////////////
async function edit(req,res,next){

    const {userId: id} = req.session

        const user = await User.findOne({ where:{id} })

        if(!user) return res.redirect("/",{
            error: "Usuario não encontrado!"
        })
       
        req.user = user

        next()
        
}

async function update(req,res,next){
    const fillAllFields = checkAllFields(req.body)
        if(fillAllFields){
            return res.render("user/edit",fillAllFields)
        }

    const {id, password} = req.body
    
    if(!password) return res.render("user/edit",{
        user:req.body,
        error: "Coloque sua senha para atualizar seu cadastro."
    })

    const user = await User.findOne({where: {id} })

    const passed = await compare(password, user.password)

    if(!passed) return res.render("user/edit",{
        user: req.body,
        error: "Senha incorreta."
    })

    req.user = user

    next()
}



module.exports = {
    post,
    edit,
    update
}