// Anda bisa lihat beberapa properti method memiliki nilai ‘*’, itu artinya route dapat diakses menggunakan seluruh method yang ada pada HTTP. 
// Kemudian nilai ‘/{any*}’ pada route paling akhir, ini berfungsi untuk menangani permintaan masuk pada path yang belum Anda tentukan. Ini merupakan salah satu teknik dalam menetapkan routing yang dinamis menggunakan Hapi.

const routes = [
	{
			method: 'GET',
			path: '/',
			handler: (request, h) => {
					return 'Homepage';
			},
	},
	{
			method: '*',
			path: '/',
			handler: (request, h) => {
					return 'Halaman tidak dapat diakses dengan method tersebut';
			},
	},
	{
			method: 'GET',
			path: '/about',
			handler: (request, h) => {
					return 'About page';
			},
	},
	{
		method: 'GET',
		path: '/hello/{name?}',
		handler: (request, h) => {
			const { name = "stranger" } = request.params;
			const { lang } = request.query;
			if(lang === 'id') {
				return `Hai, ${name}!`;
			}

			return `Hello, ${name}!`;
		}
	},
	{
		method: 'POST',
		path: '/login',
		handler: (request, h) => {
				const { username, password } = request.payload;
				return `Welcome ${username}!`;
		},
	},
	{
			method: '*',
			path: '/about',
			handler: (request, h) => {
					return 'Halaman tidak dapat diakses dengan method';
			},
	},
	{
			method: '*',
			path: '/{any*}',
			handler: (request, h) => {
					return 'Halaman tidak ditemukan';
			},
	},
];

module.exports = routes;