import mongoose from "mongoose"

const prepressSchema = mongoose.Schema(
    {
        enquiry: { type: Object, required: true },
        status: {
            type: String,
            enum: ["Pending", "Sent to Prepress", "Ups Updated"]
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Prepress = mongoose.model("Prepress", prepressSchema)
export default Prepress