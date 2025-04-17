let test = async () => {
	const {
		filterApartments,
		getApartments,
		getLocationUrl
	} = require('./services/apartmentService')
	try {
		// получаем данные пользователя с БД
		const user = {
			minPrice: 500,
			maxPrice: 1000,
			minRooms: 1,
			maxRooms: 2,
			city: 'Köln'
			// city: 'Hamburg'
		}
		
		// получаем путь для запроса на квартиры в зависимости от города
		const locationUrl = await getLocationUrl(user.city)
		
		console.log(locationUrl)
		// получаем квартиры
		const apartments = await getApartments(locationUrl?.url)
		// фильтруем квартиры по данным пользователя
		let filteredApartments = await filterApartments(
			apartments,
			user.minPrice,
			user.maxPrice,
			user.minRooms,
			user.maxRooms
		)
		console.log(filteredApartments)
		
	} catch (error) {
		console.error('Ошибка при получении квартир:', error)
	}
	
	// await test()
}
test()
