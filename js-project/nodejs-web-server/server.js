// console.log('Halo, kita akan belajar membuat server');
const http = require('http');
 
// const requestListener = (request, response) => {
//     response.setHeader('Content-Type', 'text/html');
//     response.statusCode = 200;
 
//     const { method } = request;
 
//     if(method === 'GET') {
//         response.end('<h1>Hello!</h1>');
//     }
 
//     if(method === 'POST') {
//         response.end('<h1>Hai!</h1>');
//     }
 
//     if(method === 'PUT') {
//         response.end('<h1>Bonjour!</h1>');
//     }
 
//     if(method === 'DELETE') {
//         response.end('<h1>Salam!</h1>');
//     }
// };

// const requestListener = (request, response) => {
    // response.setHeader('Content-Type', 'text/html');
    // response.statusCode = 200;
 
    // const { method } = request;

    // if(method === 'POST') {
    //   let body = []

		// 	request.on('data',(param)=>{
		// 		body.push(param);
		// 	});

		// 	request.on('end', ()=>{
		// 		body = Buffer.concat(body).toString();
		// 		const {name} = JSON.parse(body)
		// 		response.end(`<h1>Halo, ${name}</h1>`)
		// 	})
    // }
// 		response.setHeader('Content-Type', 'text/html');
//     response.statusCode = 200;
 
//     const { method, url } = request;

// 		if(url === '/') {
// 			if(method === 'GET') {
// 					response.end('<h1>Ini adalah homepage</h1>');
// 			} else {
// 					response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
// 			}
// 		} else if(url === '/about') {
// 			if(method === 'GET') {
// 					response.end('<h1>Halo! Ini adalah halaman about</h1>')
// 			} else if(method === 'POST') {
// 					let body = [];
	
// 					request.on('data', (chunk) => {
// 							body.push(chunk);
// 					});

// 					request.on('end', () => {
// 							body = Buffer.concat(body).toString();
// 							const { name } = JSON.parse(body);
// 							response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
// 					});
// 			} else {
// 					response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
// 			}
// 		} else {
// 				response.end('<h1>Halaman tidak ditemukan!</h1>');
// 		}
// };
 
// const server = http.createServer(requestListener);
 
// const port = 5000;
// const host = 'localhost';
 
// server.listen(port, host, () => {
//     console.log(`Server berjalan pada http://${host}:${port}`);
// });

const requestListener = (request, response) => {
	response.setHeader('Content-Type', 'application/json');
	response.setHeader('X-Powered-By', 'NodeJS');

	const { method, url } = request;

	if(url === '/') {
			if(method === 'GET') {
					response.statusCode = 200;
					// response.end('<h1>Ini adalah homepage</h1>');
					response.end(JSON.stringify({
						message:'Ini adalah halaman homepage',
					}));
			} else {
					response.statusCode = 400;
					// response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
					response.end(JSON.stringify({
						message:`Halaman tidak dapat diakses dengan ${method} request`
					}));
			}
	} else if(url === '/about') {
			if(method === 'GET') {
					response.statusCode = 200;
					// response.end('<h1>Halo! Ini adalah halaman about</h1>')
					response.end(JSON.stringify({
						message:'Halo! Ini adalah halaman about',
					}));
			} else if(method === 'POST') {
					let body = [];
	
					request.on('data', (chunk) => {
							body.push(chunk);
					});

					request.on('end', () => {
							body = Buffer.concat(body).toString();
							const { name } = JSON.parse(body);
							response.statusCode = 200;
							// response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
							response.end(JSON.stringify({
								message:`Halo, ${name}! Ini adalah halaman about`,
							}));
					});
			} else {
					response.statusCode = 400;
					response.end(JSON.stringify({
						message: `Halaman tidak dapat diakses menggunakan ${method} request`,
					}));
			}
	} else {
			response.statusCode = 404;
			// response.end('<h1>Halaman tidak ditemukan!</h1>');
			response.end(JSON.stringify({
				message: 'Halaman tidak ditemukan!',
			}));
	}
};

const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

// curl -X GET http://localhost:5000
// output: <h1>Hello!</h1>
// curl -X POST http://localhost:5000
// output: <h1>Hai!</hai>
// curl -X PUT http://localhost:5000
// output: <h1>Bonjour!</h1>
// curl -X DELETE http://localhost:5000
// output: <h1>Salam!</h1>
// curl -X GET http://localhost:5000 -i
// curl -X GET http://localhost:5000/anything