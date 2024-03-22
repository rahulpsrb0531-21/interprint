import mongoose from "mongoose"
import customError from "../custom/customError.js"
import generateToken from "../custom/generateToken.js"
import Client from "../model/client.js"
import Sales from "../model/sales.js"
import { salesNav } from "../custom/customNavLinks.js"

// @desc    Register Client
// @route   POST /api/client/register
// @access  Private
const registerClient = async (req, res) => {
    try {
        // console.log('saldjs')
        const { name, email, password, role } = req.body
        if (!name || !email || !password || !role) throw customError.dataInvalid
        const userExits = await Client.findOne({ email })
        if (userExits) throw customError.userExists
        const newClient = await Client.create({
            name,
            email,
            password,
            role
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

// @desc    Register Sales
// @route   POST /api/sales/register
// @access  Private
const registerSales = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        if (!name || !email || !password || !role) throw customError.dataInvalid
        const userExits = await Sales.findOne({ email })
        if (userExits) throw customError.userExists
        const newSales = await Sales.create({
            name,
            email,
            password,
            navConfig: salesNav,
            role
        })

        // Create a new object without the password field
        const userWithoutPassword = newSales.toObject()
        delete userWithoutPassword.password

        res.status(200).json({
            success: true,
            user: userWithoutPassword,
            accessToken: generateToken(newSales.role),
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

export { registerClient, registerSales }