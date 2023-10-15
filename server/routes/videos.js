import { addVideo, addView, deleteVideo, getByTags, getVideo, random, search, sub, trends, updateVideo } from '../controllers/video.js';

import express from 'express';
import { verifyToken } from '../verifyToken.js';

const router= express.Router();

//CREATE A VIDEO 
router.post('/', verifyToken, addVideo)

//UPDATE A VIDEO
router.put('/:id', verifyToken, updateVideo)

//DELETE A VIDEO
router.delete('/:id', verifyToken, deleteVideo)

router.get('/find/:id',  getVideo)
router.put('/view/:id',  addView)
router.get('/trends', trends )
router.get('/random',  random)
router.get('/sub',verifyToken, sub)

router.get('/tags', getByTags);
router.get('/search', search);

export default router;