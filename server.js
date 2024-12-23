const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)

// Route to handle form submission
app.post("/send", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Please fill in all required fields.");
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email service (e.g., Gmail, Outlook)
        auth: {
            user: "021biswajit@gmail.com", // Replace with your email
            pass: "iiwy zooc twzt njyf", // Replace with your email password or app-specific password
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: "021biswajit@gmail.com", // Replace with your receiving email
        subject: subject || "New Contact Form Submission",
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "There was an error sending the message." });
    }
    
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
