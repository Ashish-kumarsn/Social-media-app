import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

// ✅ Fixed syntax
router.post('/', upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File Upload Successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Upload failed" });
    }
});

export default router;