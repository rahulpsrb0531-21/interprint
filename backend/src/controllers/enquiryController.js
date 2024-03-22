import mongoose from "mongoose"
import customError from "../custom/customError.js"
import Enquiry from "../model/enquiry.js"

// @desc    Create a Enquiry
// @route   POST /api/enquiry/create
// @access  Public
const createEnquiry = async (req, res) => {
    try {
        const {
            firstName, lastName, email, phone, companyName,
            companyAddress, requirements } = req.body
        console.log("sdlsfjk;")
        const newEnquiry = await Enquiry.create({
            firstName,
            lastName,
            email,
            phone,
            companyName,
            companyAddress,
            requirements
        })

        res.status(200).json({
            success: true,
            user: newEnquiry,
            message: `Create Enquiry in Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

// @desc    Get Enquiry All
// @route   GET /api/enquiry/all
// @access  Private
const getEnquiryAll = async (req, res) => {
    try {
        const allEnquiry = await Enquiry.find().sort({ "created_at": -1 })
        // console.log(allEnquiry)
        res.status(200).json({
            success: true,
            allEnquiry,
            message: 'Get All Enquiry  successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

export { createEnquiry, getEnquiryAll }