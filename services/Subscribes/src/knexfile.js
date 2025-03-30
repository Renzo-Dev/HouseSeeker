// Docker
const path = require('path')
module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: 'postgres',
			user: 'rent',
			password: 'rent',
			database: 'rentdb_subscribes'
		},
		migrations: {
			directory: path.join(__dirname, '/services/database/migrations') // Абсолютный путь
		}
	}
}

// const path = require('path')
// module.exports = {
// 	development: {
// 		client: 'pg',
// 		connection: {
// 			host: '127.0.0.1',
// 			user: 'renzo',
// 			password: 'Dan098dan',
// 			database: 'rentdb_subscribe'
// 		},
// 		migrations: {
// 			directory: path.join(__dirname, '/services/database/migrations') // Абсолютный путь
// 		}
// 	}
// }