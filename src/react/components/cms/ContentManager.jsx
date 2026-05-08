import { useState } from 'react';

const COLLECTIONS = [
	{ value: 'albums', label: 'Álbumes' },
	{ value: 'shows', label: 'Shows' },
	{ value: 'news', label: 'Noticias' },
	{ value: 'general-data', label: 'Datos generales' },
];

const ContentManager = () => {
	const [collection, setCollection] = useState('albums');
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(null);
	const [jsonText, setJsonText] = useState('');
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const load = async (col = collection) => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`/api/content/${col}`);
			const data = await res.json();
			setItems(Array.isArray(data) ? data : [data]);
			setLoaded(true);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const openCreate = () => {
		setError(null);
		setJsonText('{\n  \n}');
		setModal({ mode: 'create' });
	};

	const openEdit = (item) => {
		setError(null);
		const { id, ...rest } = item;
		setJsonText(JSON.stringify(rest, null, 2));
		setModal({ mode: 'edit', id });
	};

	const save = async () => {
		setSaving(true);
		setError(null);
		try {
			const body = JSON.parse(jsonText);
			const isCreate = modal.mode === 'create';
			const url = isCreate
				? `/api/content/${collection}`
				: `/api/content/${collection}/${modal.id}`;
			const res = await fetch(url, {
				method: isCreate ? 'POST' : 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const err = await res.json();
				throw new Error(err.error);
			}
			setModal(null);
			load(collection);
		} catch (err) {
			setError(err.message);
		} finally {
			setSaving(false);
		}
	};

	const remove = async (id) => {
		if (!confirm('¿Eliminar este elemento?')) return;
		await fetch(`/api/content/${collection}/${id}`, { method: 'DELETE' });
		load(collection);
	};

	const previewKeys = items.length > 0
		? Object.keys(items[0]).filter((k) => k !== 'id').slice(0, 3)
		: [];

	return (
		<div>
			<div className="flex jc-b ai-c mb-3" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
				<div className="flex g-2 ai-c">
					<select
						className="input input--sm"
						value={collection}
						onChange={(e) => setCollection(e.target.value)}
					>
						{COLLECTIONS.map((c) => (
							<option key={c.value} value={c.value}>{c.label}</option>
						))}
					</select>
					<button className="btn btn--primary btn--sm" onClick={() => load(collection)}>
						Cargar
					</button>
				</div>
				<button className="btn btn--primary" onClick={openCreate}>
					+ Nuevo
				</button>
			</div>

			{error && <p className="error-text mb-2">{error}</p>}

			{loading ? (
				<p className="muted">Cargando...</p>
			) : !loaded ? (
				<p className="muted">Selecciona una colección y haz clic en Cargar.</p>
			) : items.length === 0 ? (
				<p className="muted">Sin elementos. Crea el primero.</p>
			) : (
				<div className="table-container">
					<table className="table">
						<thead>
							<tr>
								<th>ID</th>
								{previewKeys.map((k) => <th key={k}>{k}</th>)}
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<tr key={item.id}>
									<td className="monospace text-xs">{item.id}</td>
									{previewKeys.map((k) => (
										<td key={k}>
											{typeof item[k] === 'object'
												? JSON.stringify(item[k])
												: String(item[k] ?? '')}
										</td>
									))}
									<td>
										<div className="flex g-1">
											<button className="btn btn--ghost btn--xs" onClick={() => openEdit(item)}>
												Editar
											</button>
											<button className="btn btn--danger btn--xs" onClick={() => remove(item.id)}>
												Eliminar
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{modal && (
				<div className="modal">
					<div className="modal__overlay" onClick={() => setModal(null)} />
					<div className="modal__box">
						<div className="modal__header">
							<h3>{modal.mode === 'create' ? 'Crear elemento' : 'Editar elemento'}</h3>
							<button className="btn btn--icon" onClick={() => setModal(null)}>×</button>
						</div>
						<div className="modal__body">
							{error && <p className="error-text mb-2">{error}</p>}
							<textarea
								className="input input--textarea"
								value={jsonText}
								onChange={(e) => setJsonText(e.target.value)}
								rows={15}
								spellCheck={false}
							/>
						</div>
						<div className="modal__footer">
							<button className="btn btn--ghost" onClick={() => setModal(null)}>
								Cancelar
							</button>
							<button className="btn btn--primary" onClick={save} disabled={saving}>
								{saving ? 'Guardando...' : 'Guardar'}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContentManager;
