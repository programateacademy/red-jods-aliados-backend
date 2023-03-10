const { httpError } = require('../helpers/handleError')
const userModel = require('../models/user')
const emailer = require('../helpers/emailer')
const nodemailer = require("nodemailer");


const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `https://tu-sitio-web.com/reset-password?token=${resetToken}`;

  await emailer.send({
    to: user.email,
    subject: 'Restablecimiento de contraseña',
    html: `<p>Hola ${user.username},</p><p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para cambiar tu contraseña:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Si no has solicitado este cambio, por favor ignora este correo electrónico.</p>`,
  });
};

const recoverytoken = async (req, res) => {
  try {
    const { email } = req.body;

    // verificar que el correo electrónico existe en la base de datos
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // generar un token de restablecimiento de contraseña que caduque en 1 hora
    const token = await generateResetPasswordToken(user.id, '1h');


    // enviar el correo electrónico con el enlace de restablecimiento de contraseña
    await sendPasswordResetEmail(user, token);

  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { recoverytoken, sendPasswordResetEmail };
