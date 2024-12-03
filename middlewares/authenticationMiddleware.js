const jwt = require('jsonwebtoken')
const { default: ApiResponse } = require('../config/ApiResponse')
require('dotenv').config()

function authenticate(allowedRoles) {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                return ApiResponse(res, false, 401, 'No Token Provided !')
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
            }
            req.user = decoded
            next()
        } catch (error) {
            return ApiResponse(res, false, 400, 'Invalid Token !')
        }
    }
}

module.exports = {
    authenticate
}