const smartgrid = require('smart-grid');

	const settings = {
		columns: 12,
		offset: '20px', // расстояние между колонками, можно использовать %
		outputStyle:'sass',
		container: {
			maxWidth: '1280px', // Максимальная ширина Wrapper
			fields: '32px' // отступы по краям на большом экране
		}, 
		breakPoints: {
			lg: {
				width: '1200px',
				fields: '30px'
			},
			md: {
				width: '992px',
				fields: '15px'
			},
			sm: {
				width: '720px',
				fields: '10px'
			},
			xs: {
				width: '576px',
				fields: '10px'
			}
		},
		oldSizeStyle: false,
		properties:[]
	}

smartgrid('src/sass/', settings);
