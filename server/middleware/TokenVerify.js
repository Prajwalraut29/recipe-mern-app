const jwt = require('jsonwebtoken')

const TokenVerify = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        jwt.verify(token, process.env.KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({ success: false, message: "token verification failed " });
            }
            req.id = decoded.id;
        })

        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

}

module.exports = { TokenVerify } 