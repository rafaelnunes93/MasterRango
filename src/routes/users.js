const express = require('express');
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')

const {onlyUsers} = require('../app/middlewares/session')

// login/logout
routes.get('/login',SessionController.loginForm)
routes.post('/login',SessionValidator.login,SessionController.login)
routes.post('/logout',SessionController.logout)

// Reset password/forgot
routes.get('/forgot-password',SessionController.forgotForm)
// routes.get('/password-reset',SessionController.resetForm)
routes.post('/forgot-password',SessionValidator.forgot,SessionController.forgot)
// routes.post('/password-reset',SessionController.reset)


// user register Controller

routes.get('/register',UserController.registerForm)
routes.post('/register',UserValidator.post,UserController.post)


routes.get('/',onlyUsers,UserController.show)
routes.get('/edit',onlyUsers,UserValidator.edit,UserController.edit)
routes.put('/',UserValidator.update,UserController.update)
// routes.delete('/',UserController.delete)

// routes.get('/:id',UserController.show)

module.exports = routes


