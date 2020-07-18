const User = require('../models/User')

async function post(req, res , next){
    //check se todos os campos estao preenchidos
const keys = Object.keys(req.body)

for(key of keys){
    if(req.body[key] == ""){
        return res.render('user/register',{
            user: req.body,
            error: 'Por favor preencha todos os campos!'
        })
    }
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



module.exports = {
    post
}