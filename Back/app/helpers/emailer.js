const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
const templatePath = path.join(__dirname, '../templates/templateRecovery.html');
const template = fs.readFileSync(templatePath, 'utf8');
const templatePath1 = path.join(__dirname, '../templates/templateWelcome.html');
const template1 = fs.readFileSync(templatePath1, 'utf8');
const createtrans =()=>{
  const transport = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth:{
      user:  process.env.COREO_TEST,
      pass:  process.env.PASS_CORREO,
    }
  })
  return transport
}

 const sendMail = async (user) =>{
  const transporter = createtrans()
  const info = await transporter.sendMail({
    from: '<lesthercrespo@gmail.com>', // sender address
    to: `${user.email}`, // list of receivers
    subject: "Bienvenido al sistema", // Subject line
    html: template1
    });
  console.log("Message sent: %s", info.messageId);
  return
 }

 const recoveryemail = async (user, token) =>{
  const transporter = createtrans()
  //const template = fs.readFileSync('./templateRecovery.html', 'utf8');
  const info = await transporter.sendMail({
    from: '<lesthercrespo@gmail.com>', // sender address
    to: `${user.email}`, // list of receivers
    subject: "Correo de recuperacion", // Subject line
    html: template.replace('{{link}}', `http://localhost:3000/recoverytoken/update-password/${token}`),
  });
  console.log("Message sent: %s", info.messageId);
  return
 }


exports.sendMail =(user)=>sendMail(user)
exports.recoveryemail =(user, token)=>recoveryemail(user, token)
