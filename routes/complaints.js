const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Complaint = require("../models/Complaint");


/* ================================================= */
/* ================= MULTER ======================== */
/* ================================================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),

  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });


/* ================================================= */
/* ================= CREATE ======================== */
/* ================================================= */
/* ⭐ UPDATED FOR ZONE/CIRCLE/WARD */

router.post("/", upload.single("photo"), async (req, res) => {

  try {

    const complaint = await Complaint.create({

      complaintId: "GHMC" + Math.floor(100000 + Math.random() * 900000),

      name: req.body.name || "",
      mobile: req.body.mobile || "",

      department: req.body.type,
      zone: req.body.zone,
      circle: req.body.circle,
      ward: req.body.ward,
      address: req.body.address,

      beforeImage: req.file ? req.file.filename : "",
      afterImage: "",

      status: "Pending"
    });

    res.json(complaint);

  } catch (err) {
    res.status(500).json(err);
  }
});


/* ================================================= */
/* ================= GET ALL ======================= */
/* ================================================= */

router.get("/", async (req, res) => {

  const data = await Complaint.find().sort({ createdAt: -1 });

  res.json(data);
});


/* ================================================= */
/* ================= UPDATE STATUS ================= */
/* ================================================= */

router.put("/:id", upload.single("afterImage"), async (req, res) => {

  const update = { status: req.body.status };

  if (req.file)
    update.afterImage = req.file.filename;

  await Complaint.findByIdAndUpdate(req.params.id, update);

  res.json({ msg: "updated" });
});


/* ================================================= */
/* ================= DELETE ======================== */
/* ================================================= */

router.delete("/:id", async (req, res) => {

  await Complaint.findByIdAndDelete(req.params.id);

  res.json({ msg: "deleted" });
});


module.exports = router;
