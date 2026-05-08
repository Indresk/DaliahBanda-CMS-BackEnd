import express from 'express';
import {
	listAssets,
	uploadAsset,
	getAsset,
	deleteAsset,
	getPresigned,
} from '../controllers/assets.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import { apiLimiter } from '../middlewares/rateLimiters.js';

const assetsRoutes = express.Router();
assetsRoutes.use(apiLimiter);

assetsRoutes.get('/', requireAuth, listAssets);
assetsRoutes.post('/upload', requireAuth, upload.single('file'), uploadAsset);
assetsRoutes.get('/:key/presigned', requireAuth, getPresigned);
assetsRoutes.get('/:key', requireAuth, getAsset);
assetsRoutes.delete('/:key', requireAuth, deleteAsset);

export default assetsRoutes;
