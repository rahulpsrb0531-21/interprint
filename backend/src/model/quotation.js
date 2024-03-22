import mongoose from "mongoose"
import { validateEmail } from "../custom/validateEmail.js"

const quotationSchema = mongoose.Schema(
    {
        enquiry: { type: Object, required: true },
        note: { type: String, required: true },
        date: { type: String, required: true },
        amount: { type: Number, required: true },
        status: {
            type: String,
            default: 'Pending',
            enum: ['Pending', 'Accepted', 'Rejected']
        }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Quotation = mongoose.model("Quotation", quotationSchema)
export default Quotation