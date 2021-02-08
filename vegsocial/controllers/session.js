
    const userLogin= (req,res, next)=>{
        res.redirect('/')
    }

    const loginView= (req,res,next)=>{
        res.render('session/login')
    }

    module.exports = {userLogin, loginView}