const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

const genereateToken = (data) => jwt.sign(data, SECRET_KEY, { expiresIn:"24h" })

const createUserJwt = (user) => {
    const payload = {
        email: user.email,
        isAdmin: user.isAdmin || false
    }

    return genereateToken(payload)
}

const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    } catch(err) {
        return {}
    }
}

module.exports = {
    genereateToken,
    createUserJwt,
    validateToken
}

