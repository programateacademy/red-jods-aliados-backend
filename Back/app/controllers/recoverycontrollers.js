const { verifyToken, decodeSign } = require('../helpers/generateToken');
const userModel = require('../models/user') //importando modelo recien creado
const { encrypt} = require('../helpers/handleBcrypt')
const bodyParser = require('body-parser');


const recoverycontroller = async (req, res) =>{
  const { token } = req.params;
    try {
      // Verificar el token
      const decoded = await verifyToken(token);

      if (!decoded) {
        return res.status(400).send({ message: 'Invalid token' });
      }

      // Buscar el usuario asociado al token
      const user = await userModel.findById(decoded._id);

      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }

      // Actualizar la contraseña del usuario
      const passHash = await encrypt(req.body.pass);
       user.pass = passHash;
      user.status = 'active';
      user.failedLoginAttempts = 0;
      const tokenExpirationDate = new Date(Date.now() - 1000); // Fecha de expiración en el pasado
      user.tokenExpirationDate = tokenExpirationDate;
      await user.save();

      res.send({ message: 'Password reset successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal server error e' });
    }
  };

module.exports={recoverycontroller}
