import multer from 'multer';

const ALLOWED_TYPES = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/gif',
	'video/mp4',
	'application/pdf',
];

export const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 10 * 1024 * 1024 },
	fileFilter: (_req, file, cb) => {
		if (ALLOWED_TYPES.includes(file.mimetype)) return cb(null, true);
		cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}`));
	},
});
