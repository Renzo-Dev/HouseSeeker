const {sendApartmentRequest} = require('./services/apartmentService')
const db = require('./services/database/db')

db.migrate.latest()
	.then(() => {
		console.log('✅ Миграции успешно применены')
		// запускаем сервис
		console.log('🚀 Сервис успешно стартовал')
		let full = false
		setInterval(async () => {
			if (!full) {
				full = true
				full = await sendApartmentRequest()
			}
		}, 15000)
	})
	.catch(err => {
		console.error('❌ Ошибка при миграциях:', err)
		process.exit(1)
	})

// let full = false
// setInterval(async () => {
// 	if (!full) {
// 		full = true
// 		full = await sendApartmentRequest()
// 	}
// }, 15000)