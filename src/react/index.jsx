import ReactDOM from 'react-dom/client';
import { StrictMode, Fragment } from 'react';
import componentMap from './componentMap.js';
const Wrapper = process.env.ENV === 'development' ? StrictMode : Fragment;

for (const { id, component, hydrate } of componentMap) {
	const el = document.getElementById(id);
	if (el) {
		try {
			if (!component) {
				console.error(`Componente ${id} no encontrado`);
				continue;
			}
			const { default: Component } = await component();

			if (hydrate) {
				try {
					const propsTag = document.getElementById('props-' + id);
					const data = JSON.parse(propsTag.innerText || '{}');
					ReactDOM.hydrateRoot(
						el,
						<Wrapper>
							<Component data={data} />
						</Wrapper>,
					);
					propsTag?.remove();
				} catch {
					const root = ReactDOM.createRoot(el);
					root.render(
						<Wrapper>
							<Component />
						</Wrapper>,
					);
				}
			} else {
				const root = ReactDOM.createRoot(el);
				root.render(
					<Wrapper>
						<Component />
					</Wrapper>,
				);
			}
		} catch (error) {
			console.error(`Error cargando [${id}]:`, error);
		}
	}
}
