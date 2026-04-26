import express from 'express';
import { json } from 'express';

const apiRoutes = express.Router();

apiRoutes.use(express.json());

apiRoutes.get('/albums', (req, res) => {
	res.status(200).json([
		{
			id: 'album-1',
			title: 'Primer álbum',
			description: 'Placeholder del primer álbum',
			image: 'https://assets.daliahbanda.com/images/album-1.jpg',
		},
		{
			id: 'album-2',
			title: 'Segundo álbum',
			description: 'Placeholder del segundo álbum',
			image: 'https://assets.daliahbanda.com/images/album-2.jpg',
		},
		{
			id: 'album-3',
			title: 'Tercer álbum',
			description: 'Placeholder del tercer álbum',
			image: 'https://assets.daliahbanda.com/images/album-3.jpg',
		},
	]);
});

apiRoutes.get('/albums/:id', (req, res) => {
	const { id } = req.params;

	res.status(200).json({
		id,
		title: `Álbum ${id}`,
		description: `Descripción placeholder del álbum ${id}.`,
		content: `Contenido placeholder del álbum ${id}.`,
		image: `https://assets.daliahbanda.com/images/${id}.jpg`,
	});
});

export default apiRoutes;
