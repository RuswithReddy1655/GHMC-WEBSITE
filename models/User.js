const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,

    mobile: {
        type: String,
        unique: true,
        required: true
    },

    password: String,

    role: {
        type: String,
        enum: ["admin", "citizen", "employee"]
    },

    zone: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("User", userSchema);
