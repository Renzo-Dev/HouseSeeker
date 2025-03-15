async function sendApartmentRequest() {
	const {getActiveSubscribes} = require('./database/repository/subscribeRepository')
	const {getUserByUserId} = require('./database/repository/userRequests')
	const {getAllSentRequests} = require('./database/repository/sent_requestsRepository')

// делаем запрос в бд
// получаем активные подписки
	let subscribes = await getActiveSubscribes()
	// если подписки есть, продолжаем
	if (subscribes.length === 0) {
		console.log('В базе данных нету подписок')
		return
	}
	let users = []
	// получаем пользователей по подпискам
	for (let subscribe of subscribes) {
		users = await Promise.all(subscribes.map(subscribe => getUserByUserId(subscribe.user_id)))
	}
	
	// получаем локацию ( город ) для пользователя
	await Promise.all(users.map(async (user) => {
		// получаем локацию с соответствии с городом
		let location = await getLocationForUser(user.city)
		// console.log(location + new Date().getSeconds())
		
		// получаем список отправленных квартир пользователем
		let sentApartments = await getAllSentRequests(user.id)
		// получаем список квартир с сайта, фильтруем квартиры в соответствии с данными пользователя
		let apartments = await filterApartments(await getApartments(location), user.min_price, user.max_price, user.min_rooms, user.max_rooms)
		// отправляем заявки ( проверяем квартиру с списком квартир отправленных пользователем )
		await Promise.all(apartments.map(async (apartment) => {
			const isSent = sentApartments.some(sentApartment => apartment.exposeeId === sentApartment.house_id)
			
			if (!isSent) {
				// если не отправлено
				// отправляем
				
				console.log('Квартира: ' + apartment.exposeeId + ' отправляем')
			}
		}))
		// for (let i = 0; i < apartments.length; i++) {
		// 	проверяем была ли отправлена заявка пользователя с такой квартирой
		// console.log(sentApartments.length)
		// sentApartments.forEach(sentApartment => {
		// if (sentApartment.house_id === apartments[i].exposeeId) {
		// 	console.log(i)
		// }
		// })
		// }
	}))
}

async function filterApartments(apartments, minPrice, maxPrice, minRooms, maxRooms) {
	return apartments.filter(item => {
		if ((!item.equipment?.includes('WG geeignet') || item.equipmentAsString?.includes('WG geeignet'))) {
			if (!item.title.includes('TAUSCHWOHNUNG')) {
				return item.priceRaw >= minPrice && item.priceRaw <= maxPrice && item.rooms >= minRooms && item.rooms <= maxRooms
			}
		}
	})
}

async function getApartments(location) {
	const axios = require('axios')
	const url = 'http://www.meinestadt.de/_re-service/get-items'
	
	const headers = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		'Referer': 'https://www.meinestadt.de/',
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Cookie': 'bm_sv=8A9FF742D3BE60CD1123760F7F35C41B~YAAQnGZWuCyVIVuVAQAA4HEdiRtdgnLdvznkOIZIR8MpSSxi5mp9s6ZmmPsAY+a0GJ4BaPmWweutUzxbulMY/q5RRqiHZ4wWhiHh6GIDPVvpcvDPBXznhJHyExuhVSqoS9EdN/zqdeyou/K5sQa+4jmdN/RXVhVpGS1mbKKjLlwQKEj6a7CCvXeyhJ5zN8RNF7Oe6r8vJVfbv+MfOe/a48cPxc6hyjrAsAUt0XX6kJFr6pxFIul4Eg4AyG0mcAiYYf/geg==~1'
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
		
		return locations.find(location => location.name === query) || locations[0]
		
	} catch (error) {
		console.error('Ошибка запроса:', error.response ? error.response.data : error.message)
	}
}

async function checkApartmentRequest() {

}

module.exports = sendApartmentRequest