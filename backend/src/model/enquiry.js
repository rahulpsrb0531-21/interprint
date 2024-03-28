import mongoose from "mongoose"
import { validateEmail } from "../custom/validateEmail.js"

const enquirySchema = mongoose.Schema(
    {

        firstName: {
            type: String,
            required: [true, 'First name is required'],
            minlength: [2, 'First name must be at least 2 characters'],
            maxlength: [50, 'First name must be at most 50 characters'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            minlength: [1, 'Last name must be at least 1 character'],
            maxlength: [50, 'Last name must be at most 50 characters'],
            trim: true,
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: validateEmail,
                message: 'Please enter a valid Gmail, Yahoo, or Hotmail email address',
            },
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            // unique: [true, 'Phone number already exists'],
        },
        companyName: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
        },
        companyAddress: {
            street: {
                type: String,
                required: [true, 'Street is required'],
                minlength: [10, 'Last name must be at least 1 character'],
                maxlength: [150, 'Last name must be at most 50 characters'],
                trim: true,
            },
            city: {
                type: String,
                required: [true, 'City is required'],
                trim: true,
                minlength: [2, 'Last name must be at least 1 character'],
                maxlength: [70, 'Last name must be at most 50 characters'],
            },
            state: {
                type: String,
                required: [true, 'State is required'],
                trim: true,
                minlength: [2, 'Last name must be at least 1 character'],
                maxlength: [70, 'Last name must be at most 50 characters'],
            },
            zip: {
                type: String,
                required: [true, 'Zip/Pin code is required'],
                trim: true,
            },
            country: {
                type: String,
                required: [true, 'Country is required'],
                trim: true,
                minlength: [2, 'Last name must be at least 1 character'],
                maxlength: [50, 'Last name must be at most 50 characters'],
            },
        },
        requirements: {
            type: String,
            required: [true, 'Requirements is required'],
            trim: true,
        },
        ups: { type: String },
        status: {
            type: String,
            enum: ["Pending", "Sent to Prepress", "Ups Updated"]
        },
        existenceStatus: {
            type: String,
            enum: ["", "New Client", "Client Exist"]
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Enquiry = mongoose.model("Enquiry", enquirySchema)
export default Enquiry