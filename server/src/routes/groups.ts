import express from "express";
import { 
	getGroups, 
	getGroup, 
	createGroup, 
	deleteGroup, 
	editGroup, 
	getUserPermissions,
	createInvitation, 
	inviteOnGroupByUrl, 
	getAllPosts, 
    savePost
} from "../controllers/groups";


const router = express.Router();

router.get('/getAll',        getGroups);
router.get('/getGroup/:urlName',  getGroup);
router.post('/createGroup',   createGroup);
router.delete('/deleteGroup/:id', deleteGroup);
router.put('/editGroup/:id',      editGroup);

router.post('/getUserPermissions', getUserPermissions);

router.get('/getAllPosts/:urlName', getAllPosts);
router.post('/savePost/', savePost);

router.post('/createInvitation', createInvitation);
router.get('/invite/:inviteHash', inviteOnGroupByUrl);

export default router;