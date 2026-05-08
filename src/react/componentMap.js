const componentMap = [
	{
		id: 'cms-live',
		hydrate: false,
		pages: ['/'],
		component: () =>
			import(/* webpackChunkName: "cms-live" */ './components/cms/LiveStatus.jsx'),
	},
	{
		id: 'cms-deploy',
		hydrate: false,
		pages: ['/'],
		component: () =>
			import(/* webpackChunkName: "cms-deploy" */ './components/cms/DeployButton.jsx'),
	},
	{
		id: 'cms-content',
		hydrate: false,
		pages: ['/content'],
		component: () =>
			import(/* webpackChunkName: "cms-content" */ './components/cms/ContentManager.jsx'),
	},
	{
		id: 'cms-assets',
		hydrate: false,
		pages: ['/assets'],
		component: () =>
			import(/* webpackChunkName: "cms-assets" */ './components/cms/AssetsManager.jsx'),
	},
];

export default componentMap;
