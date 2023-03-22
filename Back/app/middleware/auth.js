const { verifyToken } = require('../helpers/generateToken')

const checkAuth = async (req, res, next) => {
    try {
        const token = req.params.token
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        if (tokenData) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'No tienes token de acceso!' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }

}

module.exports = checkAuth
