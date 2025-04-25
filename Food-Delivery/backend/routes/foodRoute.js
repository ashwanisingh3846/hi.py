
import express from 'express';
import foodController from '../controllers/foodControllers.js';
import multer from 'multer';
import path from 'path';
const router = express.Router();
const storage = multer.diskStorage({
    destination: path.resolve("uploads"),
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`.toString());
    },
  });
  
  const upload = multer({ storage: storage });
  
router.post("/addFood",upload.single("image"),foodController.addFood);  
router.get("/getFood",foodController.getFood);
router.post("/removeFood",foodController.removeFood);
export default router;