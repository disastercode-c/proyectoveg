const nodemailer = require('nodemailer')

const send = async (to, subject, text)=>{
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
        subject,
        text
    }

    const resSend = await transporter.send(mailOptions, (err, data)=>{
        return resSend;
    })

    
}

module.exports = {send}