const User = require('../models/User')

function onlyUsers(req,res, next){
    if(!req.session.userId){
        
        return res.redirect('/users/login')
    }

    

    next()
}


async function onlyAdmin(req, res, next) {
    const id = req.session.userId;
    const user = await User.findOne({ where: { id } });
    if (user.is_admin == false) {
      // redirect("/admin");
  
      return res.render("home/index", {
        error: "Apenas admnistradores podem acessar essa área",
      });
    }
  
    next();
  }


module.exports ={
    onlyUsers,
    onlyAdmin
}