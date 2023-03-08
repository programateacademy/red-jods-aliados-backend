const nodemailer = require("nodemailer");

const createtrans =()=>{
  const transport = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth:{
      user: 'lesthercrespo@gmail.com',
      pass: 'pjvmejmkujfvdlrc'
    }
  })
  return transport
}

 const sendMail = async (user) =>{
  const transporter = createtrans()
  const info = await transporter.sendMail({
    from: '<lesthercrespo@gmail.com>', // sender address
    to: `${user.email}`, // list of receivers
    subject: "dime si te llego por whatsapp", // Subject line
    text: `Hello world? ${user.name} este mensaje a sido enviado desde node`, // plain text body
    html: "<b>Holi</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  return
 }


exports.sendMail =(user)=>sendMail(user)
