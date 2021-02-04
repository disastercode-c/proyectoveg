const nodemailer = require('nodemailer')
const token = require('../models/token')

const send = async (to, token)=>{
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'nodemailerADL@gmail.com',
            pass : 'desafiolatam'
        }
    })  

    let mailOptions = {
        from : 'nodemailerADL@gmail.com',
        to,
        subject: 'Verificación de cuenta',
        text: 'Hola, \n\n' + 'Por favor, verifique su cuenta haga click en el siguiente link : \n'+ 'http://localhost:3000' + '\/token/confirmation\/'+ token.token + '.\n'
    }

    const resSend = await transporter.send(mailOptions, (err, data)=>{
        return resSend;
    })

    
}

module.exports = {send}