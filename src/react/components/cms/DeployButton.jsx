import { useState } from 'react';

const STATUS = {
	idle: { label: 'Trigger Deploy', cls: '' },
	loading: { label: 'Enviando...', cls: 'btn--disabled' },
	success: { label: '✓ Deploy enviado', cls: 'btn--success' },
	error: { label: '✗ Error', cls: 'btn--danger' },
};

const DeployButton = () => {
	const [status, setStatus] = useState('idle');

	const handleDeploy = async () => {
		setStatus('loading');
		try {
			const res = await fetch('/api/deploy/trigger', { method: 'POST' });
			if (!res.ok) throw new Error();
			setStatus('success');
		} catch {
			setStatus('error');
		} finally {
			setTimeout(() => setStatus('idle'), 3500);
		}
	};

	const { label, cls } = STATUS[status];
	return (
		<button
			className={`btn btn--primary btn--sm ${cls}`}
			onClick={handleDeploy}
			disabled={status === 'loading'}
		>
			{label}
		</button>
	);
};

export default DeployButton;
