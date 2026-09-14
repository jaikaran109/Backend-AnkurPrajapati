const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


async function registerUser(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" })
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (isUserAlreadyExists) {
            return res.status(409).json({ message: "User already exists" })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role
        })

        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET)


        res.cookie("token", token, { httpOnly: true })


        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error registering user", error: err.message })
    }

}


async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!password || (!username && !email)) {
            return res.status(400).json({ message: "Username/email and password are required" })
        }

        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }


        const isPasswordValid = await bcrypt.compare(password, user.password)


        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET)

        res.cookie("token", token, { httpOnly: true })


        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error logging in", error: err.message })
    }




}

async function logoutUser(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: "User logged out successfully" })
}


module.exports = { registerUser, loginUser, logoutUser }