const { httpError } = require('../helpers/handleError')
const { encrypt, compare} = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/user')

const loginCtrl = async (req, res) => {
  try {
      const { username, pass} = req.body

      const user = await userModel.findOne({ username })

      if (!user) {
          res.status(404)
          res.send({ error: 'User not found' })
          return
      }

      if (user.status === 'disabled') {
        res.status(401)
        res.send({ error: 'User is disabled' })
        return
      }

      const checkPassword = await compare(pass, user.pass)

      const tokenSession = await tokenSign(user)

      if (checkPassword) {
          res.send({
              data: user,
              tokenSession
          })
          return
      }


      if (checkPassword) {
          // Si la contraseña es correcta, restablecer el contador de intentos fallidos
          await userModel.updateOne({ username }, { failedLoginAttempts: 0 })
          res.send({ user })
          return
      }

      // Si la contraseña es incorrecta, incrementar el contador de intentos fallidos
      const newFailedAttempts = (user.failedLoginAttempts || 0) + 1
      await userModel.updateOne({ username }, { failedLoginAttempts: newFailedAttempts })

      if (newFailedAttempts >= 3) {
          // Si el usuario ha alcanzado el límite de intentos fallidos, deshabilitarlo
          await userModel.updateOne({ username }, { status: 'disabled' })
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

        res.send( registerUser )

    } catch (e) {
        httpError(res, e)
    }
}



module.exports = { registerCtrl, loginCtrl }
