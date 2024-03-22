import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import { validateEmail } from "../custom/validateEmail.js"


const prepressSchema = mongoose.Schema(
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
        role: { type: String, default: "PREPRESS" }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

prepressSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
// `pre` method with value `save` will run the code before saving
prepressSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    // Salt is request to hash the password asynchronously
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Prepress = mongoose.model("Prepress", prepressSchema)
export default Prepress