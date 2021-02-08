const jwt = require('jsonwebtoken')
const SECRET_KEY = 'llavesecreta'

module.exports = {
    adminView: (req,res,next)=>{
        const {token} = req.query;
        jwt.verify(token, SECRET_KEY, (err)=>{
            err ? res.status(401).send({error:"401", message: err}) : res.render('administrator/admin')}
        )}

}