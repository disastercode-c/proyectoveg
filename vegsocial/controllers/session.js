
module.exports = {
    userLogin: (req,res)=>{
        res.redirect('/')
    },

    loginView: (req,res)=>{
        res.render('/login')
    }
}