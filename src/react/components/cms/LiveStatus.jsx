import { useState, useEffect } from 'react';

const LiveStatus = () => {
	const [status, setStatus] = useState(null);

	const load = () => {
		fetch('/api/content/general-data/live-public')
			.then((r) => r.json())
			.then((d) => setStatus(d.status ?? null))
			.catch(() => setStatus(null));
	};

	useEffect(() => {
		load();
		const interval = setInterval(load, 30_000);
		return () => clearInterval(interval);
	}, []);

	if (status === null)
		return <span className="badge badge--neutral">Sin datos</span>;
	return (
		<span className={`badge ${status ? 'badge--live' : 'badge--offline'}`}>
			{status ? '🔴 EN VIVO' : '⏹ Offline'}
		</span>
	);
};

export default LiveStatus;
