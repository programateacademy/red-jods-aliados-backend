const { httpError } = require('../helpers/handleError');
const { encrypt } = require('../helpers/handleBcrypt');
const userModel = require('../models/user');

const recoverytoken = async (req, res) => {
  try {
    const { token } = req.params;
    const { pass } = req.body;

    const user = await userModel.findOne({ resetToken: token });

    if (!user) {
      return res.status(404).send({ message: 'Token inválido o expirado' });
    }

    const passHash = await encrypt(pass);

    await userModel.updateOne({ resetToken: token }, {
      pass: passHash,
      status: "activo",
      failedLoginAttempts: 0,
      resetToken: null // Borrar el token después de actualizar la contraseña
    });

    res.send({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = { recoverytoken };
