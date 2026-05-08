import express from 'express';
import contentRoutes from './content.routes.js';
import assetsRoutes from './assets.routes.js';
import deployRoutes from './deploy.routes.js';

const apiRoutes = express.Router();

apiRoutes.use('/content', contentRoutes);
apiRoutes.use('/assets', assetsRoutes);
apiRoutes.use('/deploy', deployRoutes);

export default apiRoutes;
