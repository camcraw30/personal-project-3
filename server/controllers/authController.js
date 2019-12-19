const bcrypt = require("bcryptjs");
require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'camacrawford625@gmail.com',
        pass: "randompassword236"
    }
});

module.exports = {
    register: async (req, res) => {
        const {name, email, password, phone_number} = req.body;
        const db = req.app.get("db");

        const foundUser = await db.auth.checkForEmail(email)

        if (foundUser[0]) {
            res.status(409).json({message: "Username Already Taken"})
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = await db.auth.registerUser(name, email, password, phone_number, hash, "false");

            req.session.user = {
                userId: newUser[0].user_id,
                name: newUser[0].name,
                email: newUser[0].email,
                password: newUser[0].password,
                phone_number: newUser[0].phone_number
            }

            let mailOptions = {
                to: email,
                from: 'camacrawford625@gmail.com',
                subject: 'Welcome to Social Media Site',
                text: `Thank you for choosing Social Media Site! We hope you enjoy browsing through our site!`
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log("here is the error", error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            })

            res.status(200).json(req.session.user)
        }
    },
    login: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get("db");

        const foundUser = await db.auth.checkForEmail(email);
        console.log(foundUser);
        if (!foundUser[0]) {
            res.status(403).json({message: "Username not found"});
        } else {
            const isAuthenticated = bcrypt.compareSync(password, foundUser[0].password)
            console.log(foundUser)

            if (isAuthenticated) {
                res.status(403).json({message: "Password is Incorrect"});
            } else {
                req.session.user = {
                    userId: foundUser[0].user_id,
                    name: foundUser[0].name,
                    email: foundUser[0].email,
                    password: foundUser[0].password,
                    phone_number: foundUser[0].phone_number
                }

                res.status(200).json(req.session.user);
            }
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}