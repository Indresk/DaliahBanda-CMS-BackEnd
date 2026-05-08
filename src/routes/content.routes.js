import express from 'express';
import { list, getOne, create, update, remove } from '../controllers/content.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { apiLimiter } from '../middlewares/rateLimiters.js';

const contentRoutes = express.Router();
contentRoutes.use(express.json());
contentRoutes.use(apiLimiter);

contentRoutes.get('/:collection', list);
contentRoutes.get('/:collection/:id', getOne);
contentRoutes.post('/:collection', requireAuth, create);
contentRoutes.put('/:collection/:id', requireAuth, update);
contentRoutes.delete('/:collection/:id', requireAuth, remove);

export default contentRoutes;
