import { createTransport } from "nodemailer"

export const sendEmailWithLoginCredential = async (email, password) => {
    try {
        const transporter = createTransport({
            service: "gmail",
            auth: {
                user: "rakeshtamboli006688@gmail.com",
                // pass: "bxhniriudfvzysnp",
                pass: "qjiotbojewjxjbbs",
            },
        })
        const info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: `Welcome to Interprint! Here is your account activate.`,
            // text: 'text',
            html: `<html>
        <head>
        </head>
        <body>
            <div style="background-color:#FFFFFF;
                        width: 100%;
                        height: 100%;
                        // color: black;
                        font-family: sans-serif;
                        padding: 5px;
                        // border-radius: 12px;
                        // text-align: left;
                        "
                        >
                <p style="font-weight: 700">Login Credential</p>
                <p style="font-weight: 500">email : ${email}</p>
                <p style="font-weight: 500">password : ${password}</p>
            </div>
            </div>
        </body>
        
        </html> `,
        });
        console.log("Message sent: %s", info);
        return { status: 200 }
    } catch (error) {
        console.log('error', error)
        return { status: error.responseCode };
    }
};