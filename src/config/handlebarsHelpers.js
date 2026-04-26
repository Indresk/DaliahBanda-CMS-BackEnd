import Handlebars from 'handlebars';
const handlebarsHelpers = {
	helpers: {
		json: (context) =>
			JSON.stringify(context)
				.replace(/</g, '\\u003c')
				.replace(/>/g, '\\u003e')
				.replace(/&/g, '\\u0026'),
		cleanToHydrate: (options) => {
			const content = options.fn(this);
			return new Handlebars.SafeString(content.replace(/>\s+</g, '><').trim());
		},
	},
};

export default handlebarsHelpers;
