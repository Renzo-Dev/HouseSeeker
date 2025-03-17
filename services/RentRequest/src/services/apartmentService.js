const axios = require('axios')

async function filterApartments(apartments, minPrice, maxPrice, minRooms, maxRooms) {
	// Фильтруем квартиры более оптимально (отсекаем сразу ненужные записи)
	return apartments.filter(item => {
		if (
			!item.equipment?.includes('WG geeignet') &&
			!item.equipmentAsString?.includes('WG geeignet') &&
			!item.title?.toLowerCase().includes('tauschwohnung') &&
			item.priceRaw >= minPrice &&
			item.priceRaw <= maxPrice &&
			item.rooms >= minRooms &&
			item.rooms <= maxRooms
		) {
			return true
		}
		return false
	})
}


async function getApartments(location, cookie) {
	const url = 'http://www.meinestadt.de/_re-service/get-items'
	
	const headers = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		'Referer': 'https://www.meinestadt.de/',
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Cookie': cookie
	}
	
	const data = {
		location: location.id,
		lat: location.latitude,
		lng: location.longitude,
		page: 1,
		pageSize: 900000,
		sr: '20',
		sort: 'distance',
		etype: 1,
		esr: 2,
		eqid: [],
		furnid: -1,
		epos: [],
		ecat: []
	}
	
	try {
		const response = await axios.post(url, data, {headers})
		return response.data.items || []
	} catch (error) {
		console.error('Ошибка запроса:', error.response ? error.response.data : error.message)
		return []
	}
	
}

async function getLocationForUser(query) {
	const url = 'https://www.meinestadt.de/_home-service/citySearch'
	const params = {query, excludeTypeLevel: 'REGIONS'}
	
	const headers = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		'Accept': 'application/json'
	}
	
	try {
		const response = await axios.get(url, {params, headers})
		const data = response.data
		
		const locations = data.flatMap(group => group.locations.filter(loc => loc.cityCenter) // Оставляем только те, у которых есть координаты
			.map(loc => ({
				id: loc.id,
				name: loc.name,
				longitude: loc.cityCenter.longitude,
				latitude: loc.cityCenter.latitude
			})))
		const cookies = response.headers['set-cookie']
		return {
			location: locations.find(location => location.name === query) || locations[0],
			cookie: cookies
		}
	} catch (error) {
		console.error('Ошибка запроса:', error.response ? error.response.data : error.message)
		return null
	}
}

async function sendApartmentRequest() {
	const {getActiveSubscribes} = require('./database/repository/subscribeRepository')
	const {getUserByUserId} = require('./database/repository/userRequests')
	const {getAllSentRequests} = require('./database/repository/sent_requestsRepository')
	const sendRequest = require('./requestService')

// делаем запрос в бд
// получаем активные подписки
	let subscribes = await getActiveSubscribes()
	// если подписки есть, продолжаем
	if (!subscribes || subscribes.length === 0) {
		console.log('В базе данных нету подписок')
		return
	}
	
	// Получаем пользователей по подпискам (параллельно)
	const users = await Promise.all(
		subscribes.map(subscribe => getUserByUserId(subscribe.user_id))
	)

	// Обрабатываем пользователей (параллелим основной поток)
	await Promise.all(users.map(async (user) => {
		if (!user) return
		console.log(user)
		// получаем локацию соответствии с городом
		let locationData = await getLocationForUser(user.city)
		
		// Получаем ранее отправленные квартиры пользователем
		let sentApartments = await getAllSentRequests(user.id)
		
		// получаем список квартир с сайта, фильтруем квартиры в соответствии с данными пользователя
		// let apartments = await filterApartments(await getApartments(locationData.location, locationData.cookie), user.min_price, user.max_price, user.min_rooms, user.max_rooms)
		
		// загружаем и фильтруем квартиры
		const apartments = await getApartments(locationData.location, locationData.cookie)
		const filtered = await filterApartments(apartments, user.min_price, user.max_price, user.min_rooms, user.max_rooms)
		
		
		// исключаем уже отправленные квартиры
		const newApartments = filtered.filter(apartment => {
			const alreadySent = sentApartments.some(sent => sent.house_id === apartment.exposeeId)
			return !alreadySent
		})
		console.log(newApartments.length)
		// отправляем новые квартиры
		await Promise.all(newApartments.map(apartment => sendRequest(user,apartment)))
		
		// // const {addSentRequest} = require('./database/repository/sent_requestsRepository')
		// // await addSentRequest(user.id, apartments[12].exposeeId, apartments[12].detailUrl)
		// console.log(apartments.length)
		// // отправляем заявки (проверяем квартиру со списком квартир отправленных пользователем)
		// await Promise.all(apartments.map(async (apartment) => {
		// 	const isSent = sentApartments.some(sentApartment => apartment.exposeeId === sentApartment.house_id)
		// 	if (!isSent) {
		// 		await sendRequest(user, apartment.exposeeId, apartment.detailUrl)
		// 	}
		// }))
	}))
	console.log('Все заявки отправлены')
}

module.exports = {
	sendApartmentRequest
}