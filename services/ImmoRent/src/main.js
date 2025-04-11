;(async () => {
	const { getApartments } = require('./services/apartmentService')
	try {
		console.log(await getApartments())
	} catch (error) {
		console.error('Ошибка при получении квартир:', error)
	}
})()
