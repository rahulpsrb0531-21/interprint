import mongoose from "mongoose"
import bcrypt from 'bcryptjs'


export function validateEmail(email) {
    const emailRegex = /^[\w-\.]+@(gmail|yahoo|hotmail)\.(com|net|org)$/i;
    return emailRegex.test(email);
}

const clientSchema = mongoose.Schema(
    {
        image: { type: String },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: validateEmail,
                message: 'Please enter a valid Gmail, Yahoo, or Hotmail email address',
            },
        },
        password: { type: String },
        phone: { type: Number, required: true },
        companyName: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: Number, required: true },
        country: { type: String, required: true },
        requirements: { type: String, required: true },
        navConfig: [
            {
                title: { type: String },
                path: { type: String },
                icon: { type: String },
            }
        ],
        role: { type: String, default: "CLIENT" },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

clientSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
// `pre` method with value `save` will run the code before saving
clientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    // Salt is request to hash the password asynchronously
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Client = mongoose.model("Client", clientSchema)
export default Client