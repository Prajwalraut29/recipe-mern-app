
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "email already exists " })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            username, email, password: hashedPassword
        })

        await user.save()
        return res.status(202).json({ success: true, message: "user signup successfully " })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }

}


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(402).json({ success: false, message: "email not found singup first " })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({ success: false, message: "invalid password " })

        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, {
            expiresIn: '1h',
        })

        res.cookie("token", token, {
            httpOnly: true,
            expiresIn: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        })

        return res.status(202).json({ success: true, message: "login successfully  ", user })

    } catch (error) {
        return res.status(202).json({ success: false, message: error.message })
    }

}


exports.logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(Date.now())
        })
        return res
            .status(200)
            .json({ success: true, message: "Logout successful" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


exports.checkuser = async (req, res) => {
    const id = req.id
    try {
        const user = await User.findById(id).select("-password")
        if (!user) {
            return res.status(400).json({ success: false, message: "Please signup" });
        }
        return res.status(200).json({ success: true, user });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}