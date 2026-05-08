import { useState, useEffect, useRef } from 'react';
import LazyImage from '../utils/LazyImage';

const isImage = (key) => /\.(jpg|jpeg|png|gif|webp)$/i.test(key);

const AssetsManager = () => {
	const [assets, setAssets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);
	const [copied, setCopied] = useState(null);
	const fileInputRef = useRef(null);

	const load = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/assets/');
			const parsedResponse = await res.json();
			setAssets(parsedResponse);
		} catch {
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, []);

	const handleUpload = async (files) => {
		setUploading(true);
		for (const file of files) {
			const form = new FormData();
			form.append('file', file);
			await fetch('/api/assets/upload', { method: 'POST', body: form });
		}
		setUploading(false);
		load();
	};

	const handleDelete = async (key) => {
		if (!confirm(`¿Eliminar ${key.split('/').pop()}?`)) return;
		await fetch(`/api/assets/${encodeURIComponent(key)}`, { method: 'DELETE' });
		load();
	};

	const copyUrl = (url) => {
		navigator.clipboard.writeText(url);
		setCopied(url);
		setTimeout(() => setCopied(null), 2000);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		handleUpload([...e.dataTransfer.files]);
	};

	return (
		<div>
			<div
				className={`upload-zone${uploading ? ' upload-zone--loading' : ''}`}
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
				onClick={() => fileInputRef.current?.click()}>
				<input
					ref={fileInputRef}
					type='file'
					multiple
					accept='image/*,video/mp4,application/pdf'
					style={{ display: 'none' }}
					onChange={(e) => handleUpload([...e.target.files])}
				/>
				<p>
					{uploading
						? 'Subiendo archivos...'
						: 'Arrastra archivos aquí o haz clic para subir'}
				</p>
			</div>

			{loading ? (
				<p className='muted mt-4'>Cargando assets...</p>
			) : assets.length === 0 ? (
				<p className='muted mt-4'>No hay assets. Sube el primero.</p>
			) : (
				<div className='assets-grid mt-4'>
					{assets.map((asset) => (
						<div key={asset.key} className='asset-card'>
							{isImage(asset.key) ? (
								<LazyImage
									src={asset.url}
									alt={asset.key}
									className='asset-card__thumb'
								/>
							) : (
								<div className='asset-card__icon'>📄</div>
							)}
							<div className='asset-card__info'>
								<p className='asset-card__name' title={asset.key}>
									{asset.key.split('/').pop()}
								</p>
								<p className='asset-card__size'>
									{asset.size ? `${(asset.size / 1024).toFixed(1)} KB` : '—'}
								</p>
							</div>
							<div className='asset-card__actions'>
								<button
									className={`btn btn--ghost btn--xs${copied === asset.url ? ' btn--success' : ''}`}
									onClick={() => copyUrl(asset.url)}>
									{copied === asset.url ? '✓ Copiado' : 'URL'}
								</button>
								<button
									className='btn btn--danger btn--xs'
									onClick={() => handleDelete(asset.key)}>
									✕
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AssetsManager;
