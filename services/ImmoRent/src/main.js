;(async () => {
	const {
		filterApartments,
		getApartments,
		getLocationUrl,
	} = require('./services/apartmentService')
	try {
		// получаем данные пользователя с БД
		const user = {
			minPrice: 500,
			maxPrice: 1000,
			minRooms: 1,
			maxRooms: 2,
		}

		// получаем путь для запроса на квартиры в зависимости от города
		// получаем квартиры
		// const apartments = await getApartments()
		// фильтруем квартиры по данным пользователя
		// let filteredApartments = await filterApartments(
		// 	apartments,
		// 	user.minPrice,
		// 	user.maxPrice,
		// 	user.minRooms,
		// 	user.maxRooms
		// )
		// console.log(filteredApartments.length)

		const locationUrl = await getLocationUrl('Köln-Lindenthal (Bezirk)')
		console.log(JSON.stringify(locationUrl, null, 2))
	} catch (error) {
		console.error('Ошибка при получении квартир:', error)
	}
})()
