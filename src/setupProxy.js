const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		proxy('/ws/1.1', {
			target: 'https://api.musixmatch.com',
			changeOrigin: true
		})
	);

	app.use(
		proxy('/2.0', {
			target: 'http://ws.audioscrobbler.com',
			changeOrigin: true
		})
	);
};
