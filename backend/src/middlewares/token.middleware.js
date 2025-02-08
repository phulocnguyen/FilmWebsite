// tokenMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const tokenMiddleware = {
    authenticateToken: (req, res, next) => {
        const token = req.headers.token;
        if (!token) {
            console.log("No token provided.")
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }
        const accessToken = token.split(" ")[1];
        //console.log(accessToken);
        jwt.verify(accessToken, SECRET_KEY, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).send({ auth: false, message: 'Token expired.' });
                }
                //console.log("failed to authenticate token.")
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            // if everything good, save to request for use in other routes
            console.log(user +" is authenticated."); 
            req.user = user;
            next();
        });
    }
};

module.exports = tokenMiddleware;
