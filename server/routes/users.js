import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

import express from 'express';

const router= express.Router();

//update user
router.put("/:id", verifyToken,  update);

//delete user
router.delete("/:id", verifyToken,  deleteUser);

//get user
router.get("/find/:id", getUser);

//subscribe user
router.put("/sub/:id",verifyToken, subscribe);

//unsubscribe user
router.put("/unsub/:id",verifyToken, unsubscribe);

//like user
router.put("/like/:videoid", verifyToken,like);

//dislike user
router.put("/dislike/:videoid", verifyToken, dislike);

export default router;