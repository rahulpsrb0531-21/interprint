import { Types } from 'mongoose'
// import mongoose from "mongoose"
import Client from "../model/client.js"
import generateToken from "../custom/generateToken.js"
import customError from "../custom/customError.js"
import Quotation from "../model/quotation.js"
import Enquiry from '../model/enquiry.js'


// @desc    Login Client
// @route   POST /api/client/login
// @access  public
const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw customError.dataInvalid
        // console.log("email, password", email, password)

        let userExits = await Client.findOne({ email })
        // console.log(userExits)
        if (!userExits) throw customError.userNotExists

        if (userExits && (await userExits.matchPassword(password))) {
            let client = await Client.findOne({ email }).select('-password')
            res.status(200).json({
                success: true,
                user: client,
                accessToken: generateToken(client.role),
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

// @desc    Get All Quotation By Client Id 
// @route   GET /api/client/quotation/:email
// @access  Private
const getQuotation = async (req, res) => {
    try {
        const email = req.params.email
        // const _Id = new Types.ObjectId(req.params.id)
        // const quotations = await Quotation.find({ "enquiry._id": _Id })
        const quotations = await Quotation.find({ "enquiry.email": email })
        res.status(200).json({
            success: true,
            data: quotations,
            message: 'Get All Quotations successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}


// @desc    Get All Enquiry By Client Email Id 
// @route   GET /api/client/get-all/enquiry
// @access  Private
const getAllEnquiryByClientEmailId = async (req, res) => {
    try {
        // const _id = req.params.id
        // const _Id = new Types.ObjectId(req.params.id)
        const { email } = req.body
        // console.log(req.body)
        const allEnquiry = await Enquiry.find({ email: email })
        res.status(200).json({
            success: true,
            data: allEnquiry,
            message: 'Get All Enquiry successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}


// @desc    Check By Email Id Client Exist
// @route   GET /api/client/existence/:email
// @access  Private
const checkByEmailIdClientExist = async (req, res) => {
    try {
        const email = req.params.email
        // console.log(email)

        let userExits = await Client.findOne({ email })
        // console.log(userExits)
        if (!userExits) throw customError.userNotExists

        res.status(200).json({
            success: true,
            existence: true,
            message: 'successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}



export { Login, getQuotation, getAllEnquiryByClientEmailId, checkByEmailIdClientExist }