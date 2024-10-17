
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        let token = req.header('x-token');
        if(!token) {
            return res.status(404).json({message: 'Token Not Found'});
        }

        let decode = jwt.verify(token, process.env.SECRET);
        req.user = decode.user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Issue'}) 
    }
}