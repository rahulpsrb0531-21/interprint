import mongoose from "mongoose"
import generateToken from "../custom/generateToken.js"
import customError from "../custom/customError.js"
import Sales from "../model/sales.js"
import Client from "../model/client.js"
import { clientNav } from "../custom/customNavLinks.js"
import Quotation from "../model/quotation.js"
import { sendEmailWithLoginCredential } from "../custom/mail.js"
import Prepress from "../model/prepress.js"
import Enquiry from "../model/enquiry.js"


// @desc    Login Client
// @route   POST /api/sales/login
// @access  public
const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw customError.dataInvalid

        let userExits = await Sales.findOne({ email })
        if (!userExits) throw customError.userNotExists

        if (userExits && (await userExits.matchPassword(password))) {
            let user = await Sales.findOne({ email }).select('-password')
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

// @desc    Register Client
// @route   POST /api/sales/client/register
// @access  Private
const registerClient = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone, companyName, street,
            city, state, zip, country, requirements } = req.body
        console.log(email, password, firstName, lastName, phone, companyName, street,
            city, state, zip, country, requirements)
        if (!email || !password || !firstName || !lastName || !phone || !companyName ||
            !street || !city || !state || !zip || !country || !requirements) throw customError.dataInvalid

        const userExits = await Client.findOne({ email })
        if (userExits) throw customError.userExists
        const newClient = await Client.create({
            email,
            password,
            firstName,
            lastName,
            phone,
            companyName,
            street,
            city,
            state,
            zip,
            country,
            requirements,
            navConfig: clientNav
        })

        // Create a new object without the password field
        const userWithoutPassword = newClient.toObject()
        delete userWithoutPassword.password

        res.status(200).json({
            success: true,
            user: userWithoutPassword,
            accessToken: generateToken(newClient.role),
            message: `Register in Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

// @desc    First Client and then create Quotation
// @route   POST /api/sales/create/quotation
// @access  Private
const createQuotation = async (req, res) => {
    try {
        const { enquiry, note, date, amount, password } = req.body
        // console.log("1")
        console.log("2", enquiry)
        if (!enquiry || !note || !date || !amount) throw customError.dataInvalid
        // first step 1  create client
        const userExits = await Client.findOne({ email: enquiry.email })
        if (userExits) {
            const newQuotation = Quotation({
                enquiry: enquiry,
                note,
                date,
                amount
            })
            await newQuotation.save()

            res.status(200).json({
                success: true,
                data: newQuotation,
                message: 'Created Quotation successfully',
            })

        } else {

            const newClient = await Client.create({
                email: enquiry.email,
                password: password,
                firstName: enquiry.firstName,
                lastName: enquiry.lastName,
                phone: enquiry.phone,
                companyName: enquiry.companyName,
                street: enquiry.companyAddress.street,
                city: enquiry.companyAddress.city,
                state: enquiry.companyAddress.state,
                zip: enquiry.companyAddress.zip,
                country: enquiry.companyAddress.country,
                requirements: enquiry.requirements,
                navConfig: clientNav
            })
            const newQuotation = Quotation({
                enquiry: newClient,
                note,
                date,
                amount
            })

            await newQuotation.save()
            sendEmailWithLoginCredential(enquiry.email, password)

            res.status(200).json({
                success: true,
                data: newQuotation,
                message: 'Created Quotation successfully',
            })
        }

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            // data: error,
            data: error,
        });
    }
}


// @desc    Create Quotation with Existing client
// @route   POST /api/sales/create/quotation
// @access  Private
// const createQuotationWithExistClient = async (req, res) => {
//     try {
//         const { enquiry, note, date, amount, password } = req.body
//         // console.log("1")
//         // console.log("2", enquiry, note, date, amount, password)
//         if (!enquiry || !note || !date || !amount || !password) throw customError.dataInvalid
//         // first step 1  create client
//         const userExits = await Client.findOne({ email: enquiry.email })
//         if (userExits) throw customError.userExists
//         const newClient = await Client.create({
//             email: enquiry.email,
//             password: password,
//             firstName: enquiry.firstName,
//             lastName: enquiry.lastName,
//             phone: enquiry.phone,
//             companyName: enquiry.companyName,
//             street: enquiry.companyAddress.street,
//             city: enquiry.companyAddress.city,
//             state: enquiry.companyAddress.state,
//             zip: enquiry.companyAddress.zip,
//             country: enquiry.companyAddress.country,
//             requirements: enquiry.requirements,
//             navConfig: clientNav
//         })

//         const newQuotation = Quotation({
//             enquiry: newClient,
//             note,
//             date,
//             amount
//         })

//         await newQuotation.save()
//         sendEmailWithLoginCredential(enquiry.email, password)

//         res.status(200).json({
//             success: true,
//             data: newQuotation,
//             message: 'Created Quotation successfully',
//         })

//     } catch (error) {
//         console.log(`***** ERROR : ${req.originalUrl, error} error`);
//         res.status(200).json({
//             success: false,
//             // data: error,
//             data: error,
//         });
//     }
// }



// @desc    Get All Quotation 
// @route   GET /api/sales/get-all/quotation
// @access  Private
const getAllQuotation = async (req, res) => {
    try {
        const quotations = await Quotation.find().sort({ "created_at": -1 })
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

// @desc    Get All Client 
// @route   GET /api/sales/get-all/client
// @access  Private
const getAllClient = async (req, res) => {
    try {
        const clients = await Client.find().sort({ "created_at": -1 })
        res.status(200).json({
            success: true,
            data: clients,
            message: 'Get All Client successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

// @desc    Create Ups 
// @route   POST /api/sales/ups/create
// @access  Private
const createUps = async (req, res) => {
    try {
        const { enquiry } = req.body
        // console.log("1")
        // console.log("2", enquiry)
        if (!enquiry) throw customError.dataInvalid

        // // first step 1  create client
        // const userExits = await Enquiry.findOne({ email: enquiry.email })
        // console.log("2", userExits)
        // if (userExits) throw customError.userExists

        const newUps = Prepress({
            enquiry,
            status: "Pending"
        })
        await newUps.save()

        const updateEnquiry = await Enquiry.findOneAndUpdate(
            { email: enquiry.email },
            { $set: { status: "Sent to Prepress" } },
            { new: true }
        )

        // sendEmailWithLoginCredential(enquiry.email, password)

        res.status(200).json({
            success: true,
            data: newUps,
            message: 'Created Ups successfully',
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

export { Login, registerClient, createQuotation, getAllQuotation, getAllClient, createUps }