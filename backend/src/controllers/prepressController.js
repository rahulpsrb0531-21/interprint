import mongoose from "mongoose"
import generateToken from "../custom/generateToken.js"
import customError from "../custom/customError.js"
import Prepress from "../model/prepress.js"
import Auth from "../model/auth.js"
import Enquiry from "../model/enquiry.js"
import Client from "../model/client.js"



// @desc    Login Prepress
// @route   POST /api/prepress/login
// @access  public
const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw customError.dataInvalid
        console.log("email, password ", email, password)

        let userExits = await Auth.findOne({ email })
        if (!userExits) throw customError.userNotExists

        if (userExits && (await userExits.matchPassword(password))) {
            let user = await Auth.findOne({ email }).select('-password')
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


// @desc    Get All Enquiry 
// @route   GET /api/prepress/all/enquiry
// @access  Private
const getAllEnquiry = async (req, res) => {
    try {
        const enquirys = await Prepress.find().sort({ "created_at": -1 })
        // console.log('enquirys', enquirys)
        res.status(200).json({
            success: true,
            data: enquirys,
            message: 'Get All Enquirys from Prepress table successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

// @desc    Update Ups 
// @route   POST /api/prepress/update/ups
// @access  Private
const updateUps = async (req, res) => {
    try {
        const { id, ups } = req.body

        if (!id || !ups) throw customError.dataInvalid

        // // first step 1  create client
        // const clientExist = await Client.findOne({ email: email })
        // console.log("2", userExits)
        // if (userExits) throw customError.userExists

        // const updatePrepressEnquiry = await Prepress.findOneAndUpdate(
        //     { "enquiry._id": id },
        //     { $set: { "enquiry.ups": ups, "enquiry.status": "Ups Updated", status: "Ups Updated" } },
        //     { new: true }
        // )

        const updateEnquiry = await Enquiry.findOneAndUpdate(
            { _id: id },
            { $set: { ups: ups, status: "Ups Updated" } },
            { new: true }
        )
        const updatePrepressEnquiry = await Prepress.findOneAndUpdate(
            { "enquiry._id": id },
            { $set: { enquiry: updateEnquiry, status: "Ups Updated" } },
            { new: true }
        )

        // sendEmailWithLoginCredential(enquiry.email, password)
        res.status(200).json({
            success: true,
            message: 'Updated Ups successfully',
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            // data: error,
            data: error,
        });
    }
}

export { Login, getAllEnquiry, updateUps }