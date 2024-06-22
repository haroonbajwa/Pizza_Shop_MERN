const multer = require("multer");

// Set up storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 8000000 }, // 1MB limit
});

module.exports = upload;
