const { httpError } = require('../helpers/handleError')
const { encrypt, compare} = require('../helpers/handleBcrypt')
const { tokenSign, tokenReset } = require('../helpers/generateToken')
const userModel = require('../models/user')
const emailer = require('../helpers/emailer')


const loginCtrl = async (req, res) => {
  try {
      const { email, pass} = req.body

      const user = await userModel.findOne({ email })

      if (!user) {
          res.status(404)
          res.send({ error: 'User not found' })
          return
      }
      const tokenReseto = await tokenReset(user)

      if (user.status === 'disabled') {
        res.status(403).send({
          tokenReseto,
          message: 'User is disabled. Check your email to recover your account.'});
        emailer.recoveryemail(user,tokenReseto);
        return;
      }

      const checkPassword = await compare(pass, user.pass)

      const tokenSession = await tokenSign(user)

      if (checkPassword) {
          res.send({
              data: user,
              tokenSession,
              message: user.name
          })
          return
      }


      if (checkPassword) {
          // Si la contraseña es correcta, restablecer el contador de intentos fallidos
          await userModel.updateOne({ email }, { failedLoginAttempts: 0 })
          res.send({ user })

          return
      }

      // Si la contraseña es incorrecta, incrementar el contador de intentos fallidos
      const newFailedAttempts = (user.failedLoginAttempts || 0) + 1
      await userModel.updateOne({ email }, { failedLoginAttempts: newFailedAttempts })

      if (newFailedAttempts >= 3) {
          // Si el usuario ha alcanzado el límite de intentos fallidos, deshabilitarlo
          await userModel.updateOne({ email }, { status: 'disabled' })
          res.status(401)
          res.send({ error: 'User disabled due to too many failed login attempts' })
          return
      }

      res.status(401)
      res.send({ error: 'Invalid password' })

  } catch (e) {
      httpError(res, e)
  }
}
//Registramos usuario
const registerCtrl = async (req, res) => {
    try {
        const { name ,username, email, pass, status } = req.body

        const passHash = await encrypt(pass) //encriptar pass
        const registerUser = await userModel.create({
            name,
            username,
            email,
            pass: passHash,
            status
        })
        emailer.sendMail(registerUser)
        res.send( registerUser )

    } catch (e) {
        httpError(res, e)
    }
}



module.exports = { registerCtrl, loginCtrl }
