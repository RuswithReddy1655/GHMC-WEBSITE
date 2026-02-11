const express = require("express");
const User = require("../models/User");
const Otp = require("../models/Otp");

const router = express.Router();

////////////////////////////////////////////////////
// 🔹 REGISTER
////////////////////////////////////////////////////
router.post("/register", async (req, res) => {
    try {
        const { name, mobile, email, role, zone } = req.body;

        const exists = await User.findOne({
            $or: [{ mobile }, { email }]
        });

        if (exists)
            return res.json({ message: "User already registered ❌" });

        await User.create({
            name,
            mobile,
            email,
            role,
            zone: role === "employee" ? zone : null
        });

        res.json({ message: "Registered successfully ✅" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

////////////////////////////////////////////////////
// 🔹 SEND OTP
////////////////////////////////////////////////////
router.post("/send-otp", async (req, res) => {
    try {
        const { contact, role } = req.body;

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.deleteMany({ contact });

        await Otp.create({
            contact,
            code,
            role
        });

        console.log("OTP:", code);

        res.json({ message: "OTP sent ✅", otp: code });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

////////////////////////////////////////////////////
// ⭐ VERY IMPORTANT (THIS FIXES YOUR ERROR)
////////////////////////////////////////////////////
module.exports = router;
