const config =  require('config')
const jwt =  require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
       return res.status(401).send("Unauthorized") 
    }
    try {
        const decodedpayload =  jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decodedpayload;
        next();
    } catch (error) {
        res.status(400).send("Invalid Message")
    }
}

module.exports = auth   