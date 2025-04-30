import user from "../model/user.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

let refreshtokens = [];

export const Signup = async (req, res) => {
    try {
        const existUser = await user.findOne({ email: req.body.email });
        if (existUser) {
            res.status(400).json({
                message: 'Email already registered..!'
            })
        } else if (!existUser) {
            const prefix = "UID"
            const userID = (prefix + "_" + Date.now())

            const HashPass = await bcrypt.hash(req.body.password, 10);
            const newUser = new user({
                userID: userID,
                name: req.body.name,
                mobileNo: req.body.mobileNo,
                address: req.body.address,
                email: req.body.email,
                password: HashPass,
            })

            const newAccount = await newUser.save();
            if (newAccount) {
                res.status(201).json({
                    message: "Registration successfull..!",
                    payload: newAccount
                })
            } else {
                res.status(404).json({
                    message: 'Somthing went wrong creating account..!'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong..!",
            error: error
        })
    }
}

export const Login = async (req, res) => {
    try {
        const registeredUser = await user.findOne({ email: req.body.email })
        if (registeredUser) {
            const enteredPwd = req.body.password;
            const dbPwd = registeredUser.password;

            const chkPwd = await bcrypt.compare(enteredPwd, dbPwd);
            if (chkPwd) {
                const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h' })
                const refreshtoken = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '24h' })

                refreshtokens.push(refreshtoken);
                res.status(201).json({
                    message: 'Login Successfull..!',
                    token,
                    refreshtoken,
                    user: {
                        userID: registeredUser.userID,
                        name: registeredUser.name,
                        mobileNo: registeredUser.mobileNo,
                        address: registeredUser.address,
                        email: registeredUser.email,
                    }
                })
            } else {
                res.status(404).json({
                    message: 'Incorrect password..!'
                })
            }
        } else {
            res.status(401).json({
                message: 'No account found under this email..!'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Somthing went wrong..!',
            error: error
        })
    }
}

export const tokenRefresh = (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) {
        res.status(401).json({
            message: "Unauthorized..!"
        })
    } else if (!refreshtokens.includes(refreshToken)) {
        res.status(403).json({
            message: "Forbidden..!"
        })
    } else {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
            if (err) {
                res.status(404).json({
                    message: "error..!"
                })
            } else {
                const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: "10s" });
                res.status(201).json({
                    message: "Session Extended..!",
                    token
                })
            }
        })
    }
}