;(async () => {
	const { filterApartments } = require('./services/apartmentService')
	try {
		let apartments = await filterApartments(500, 1000, 1, 2)
		console.log(apartments.length)
	} catch (error) {
		console.error('Ошибка при получении квартир:', error)
	}
})()
