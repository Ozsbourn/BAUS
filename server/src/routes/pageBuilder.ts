import express  from "express";
import { save, getPage } from "../controllers/pageBuilder";


const router = express.Router();

router.post('/save', save);
router.get('/get',   getPage);

export default router;