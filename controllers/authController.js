const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require("../model/user");

const authController = express.Router();

function checkIsLoggedIN(req, res, next) {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect("/register");
    }
}

authController.get("/", (req, res) => {
    res.render("home", { user: req.session.user });
});

authController.get("/login", (req, res) => {
    res.render("login");
});

authController.get("/register", (req, res) => {
    res.render("register");
});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sukhveen.d@gmail.com', // Your Gmail address
        pass: 'xkog mdys xrgp qgjm' // Your Gmail password
    }
});
authController.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).send("Email is required");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Set the role for 'sukhveen' to 'admin'
        const role = username === 'sukhveen' ? 'admin' : 'user';

        // Create a new user with the hashed password, role, and email
        const newUser = new User({ username, password: hashedPassword, role, email });
        await newUser.save();

        // Send verification email
        const verificationLink = `http://localhost:3334/verify-email/${newUser._id}`;
        const mailOptions = {
            from: 'sukhveen.d@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: `Click <a href="${verificationLink}">here</a> to verify your email.`
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send("Error sending verification email");
            } else {
                console.log('Email sent: ' + info.response);
                res.send(`
                    <script>
                        alert(' Please check your email for verification.');
                        // window.location.href = '/login';
                    </script>
                `);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

authController.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username: username });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                res.redirect("/");
            } else {
                res.send("Invalid password");
            }
        } else {
            res.send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// authController.post("/register", async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({ username, password: hashedPassword });
//         await newUser.save();

//         res.send(`
//             <script>
//                 alert('User registered successfully');
//                 window.location.href = '/login';
//             </script>
//         `);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

authController.get("/verify-email/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (user) {
            user.emailVerified = true;
            await user.save();

            res.send(`
                <script>
                    alert('Email verified successfully! You can now log in.');
                    window.location.href = '/login';
                </script>
            `);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

authController.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect("/");
        }
    });
});

module.exports = authController;
