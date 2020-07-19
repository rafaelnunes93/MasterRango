const express = require('express');
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')

const Validador = require('../app/validators/user')



// login/logout
// routes.get('/login',SessionController.loginForm)
// routes.post('/login',SessionController.login)
routes.post('/logout',SessionController.logout)

// Reset password/forgot
// routes.get('/forgot-password',SessionController.forgotForm)
// routes.get('/password-reset',SessionController.resetForm)
// routes.post('/forgot-password',SessionController.forgot)
// routes.post('/password-reset',SessionController.reset)


// user register Controller

routes.get('/register',UserController.registerForm)
routes.post('/register',Validador.post,UserController.post)


routes.get('/',UserController.show)
routes.get('/edit',Validador.edit,UserController.edit)
routes.put('/',Validador.update,UserController.update)
// routes.delete('/',UserController.delete)

// routes.get('/:id',UserController.show)

module.exports = routes


