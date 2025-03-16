async function filterApartments(apartments, minPrice, maxPrice, minRooms, maxRooms) {
	// Фильтруем квартиры по заданным критериям
	return apartments.filter(item => {
		// Исключаем квартиры, которые подходят только для WG (общего жилья), если это явно указано
		if (!item.equipment?.includes('WG geeignet') || item.equipmentAsString?.includes('WG geeignet')) {
			// Исключаем квартиры, заголовок которых содержит слово "Tauschwohnung" (обменная квартира)
			if (!item.title.toLowerCase().includes('tauschwohnung')) {
				// Проверяем, чтобы цена и количество комнат соответствовали указанным диапазонам
				return item.priceRaw >= minPrice && item.priceRaw <= maxPrice &&
					item.rooms >= minRooms && item.rooms <= maxRooms
			}
		}
		// Если условия не выполнены, исключаем квартиру из результатов
		return false
	})
}

async function getApartments(location, cookie) {
	const axios = require('axios')
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
		pageSize: 2000000,
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
		return response.data.items
	} catch (error) {
		console.error('Ошибка запроса:', error.response ? error.response.data : error.message)
	}
}

async function getLocationForUser(query) {
	const axios = require('axios')
	const url = 'https://www.meinestadt.de/_home-service/citySearch'
	const params = {
		query: query,
		excludeTypeLevel: 'REGIONS'
	}
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
	}
}

async function sendApartmentRequest() {
	const {getActiveSubscribes} = require('./database/repository/subscribeRepository')
	const {getUserByUserId} = require('./database/repository/userRequests')
	const {getAllSentRequests} = require('./database/repository/sent_requestsRepository')
	const getToken = require('./authService')
	const sendRequest = require('./requestService')

// делаем запрос в бд
// получаем активные подписки
	let subscribes = await getActiveSubscribes()
	// если подписки есть, продолжаем
	if (!subscribes || subscribes.length === 0) {
		console.log('В базе данных нету подписок')
		return
	}
	let users = []
	// получаем пользователей по подпискам
	for (let subscribe of subscribes) {
		users = await Promise.all(subscribes.map(subscribe => getUserByUserId(subscribe.user_id)))
	}
	
	// получаем локацию (город) для пользователя
	await Promise.all(users.map(async (user) => {
		// получаем локацию соответствии с городом
		let locationData = await getLocationForUser(user.city)
		
		// получаем список отправленных квартир пользователем
		let sentApartments = await getAllSentRequests(user.id)
		// получаем список квартир с сайта, фильтруем квартиры в соответствии с данными пользователя
		let apartments = await filterApartments(await getApartments(locationData.location, locationData.cookie), user.min_price, user.max_price, user.min_rooms, user.max_rooms)
		
		// // отправляем заявки (проверяем квартиру со списком квартир отправленных пользователем )
		let token = await getToken()
		// console.log(token)
		await sendRequest(token, user, apartments[15].exposeeId)
		
		// await Promise.all(apartments.map(async (apartment) => {
		// 	const isSent = sentApartments.some(sentApartment => apartment.exposeeId === sentApartment.house_id)
		//
		// 	if (!isSent) {
		// 		// console.log(user)
		// 		// если не отправлено
		// 		// отправляем
		// 		// console.log(apartment)
		// 		// let token = await getToken()
		// 		// console.log(token)
		//
		// 		sendRequest()
		//
		// 		console.log('Квартира: ' + apartment.exposeeId + ' отправляем')
		// 	} else {
		// 		console.log('Квартира: ' + apartment.exposeeId + ' не отправлен')
		// 	}
		// }))
	}))
}

module.exports = {
	sendApartmentRequest
}