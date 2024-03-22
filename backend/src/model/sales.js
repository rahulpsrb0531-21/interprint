import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import { validateEmail } from "../custom/validateEmail.js"

const salesSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: validateEmail,
                message: 'Please enter a valid Gmail, Yahoo, or Hotmail email address',
            },
        },
        password: { type: String, required: true },
        navConfig: [
            {
                title: { type: String },
                path: { type: String },
                icon: { type: String },
            }
        ],
        role: { type: String, default: "SALES" }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

salesSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
// `pre` method with value `save` will run the code before saving
salesSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    // Salt is request to hash the password asynchronously
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Sales = mongoose.model("Sales", salesSchema)
export default Sales