const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */

// serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// ⭐ serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


/* ================= DATABASE ================= */
mongoose.connect("mongodb://127.0.0.1:27017/ghmcDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));


/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/complaints", require("./routes/complaints"));


/* ================= HOME ROUTE ================= */
app.get("/", (req, res) => {
    res.redirect("/login.html");
});


/* ================= 404 HANDLER ================= */
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
/* ================= SERVER ================= */
const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});