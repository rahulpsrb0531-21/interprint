import mongoose from "mongoose"
import generateToken from "../custom/generateToken.js"
import customError from "../custom/customError.js"
import Purchase from "../model/purchase.js"



// @desc    Login Purchase
// @route   POST /api/purchase/login
// @access  public
const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw customError.dataInvalid

        let userExits = await Purchase.findOne({ email })
        if (!userExits) throw customError.userNotExists

        if (userExits && (await userExits.matchPassword(password))) {
            let user = await Purchase.findOne({ email }).select('-password')
            res.status(200).json({
                success: true,
                user,
                accessToken: generateToken(user.role),
                message: `Logged In Successfully`
            })
        } else {
            res.status(200).json({
                success: false,
                data: "User is not registered"
            })
        }

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            data: error,
            success: false,
        })
    }
}


export { Login }