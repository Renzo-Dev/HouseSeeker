const UserService = require('../../services/UserService')
const axios = require('axios')
const {quote} = require('telegraf/format')
const https = require('node:https')

async function getToken() {
	try {
		const token = await getToken();
		console.log("reCAPTCHA token:", token);
		
		// Отправка на сервер
		const response = await fetch('/api/verify-captcha', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		});
		
		const result = await response.json();
		console.log("Verification result:", result);
	} catch (error) {
		console.error("Ошибка при получении токена reCAPTCHA:", error);
	}
}

async function start(ctx) {
	getToken()
	// const location = await findLocation('Köln')
	// console.log(location)
	// let items = await filterApartments(await getApartments(location))
	// console.log(items.length)

// Пример вызова функции
	const requestData = JSON.stringify({
		email: 'kovelenkodima@gmail.com',
		salutation: 'm',
		firstname: 'Dan',
		lastname: 'Koshevoy',
		message: 'Hi i need home',
		captchaToken: '03AFcWeA5WRm9olUghd8Ue7prq6bQhLlc9YPTwlxU0ujSCPtlCwzvdBQJBQKQ0BJlPhYLRZG5_BreeWixoNLCtetYykVYY2ylhrFKjR5XLOWCTw7-IOu4Gw0Tt5aJSv55WfPFhkOYQPQZgLsaBHUzeM6I3XtTgABT89uVd34K_Aq-o1znr0r_lOoiFirqVXhRnEXA3rxLDGpYpXo2xlBZRVwZzLw1P1kwKYVmOic7VhMqwYCINi2uvPMp54AerU6L8O9BEZaX-SrYI7ylAQJMidi76h7n--4jVThejY9MIk9VBWBP4YboKKeJF2QCB57vE2lGop6NnHlzmWf0IOPzRoqcnSyGyIVtPU0OUa_sIzCrRJ3_KU1RTu9_2DjU1GWWDGNGVO5pFKAC6EHlc7Hkz6-CaeFSepfKbGYWArhbv6q2FGam2mhg_O8yWB1Sivd3EK6QZstCHxJJoAXqweYsAKxfGpTOBpQU03kw_rjn47vim4QRJZ6jOYc7MV3TRLX93EpM2kfRcJocFd-IrrtNlz-kX3DGYI3juFNSJGyeN4mF6EofeMEguqrhB5ANADywIbb-u4ACB2uj1GC0OH35FmnBs9hzBFFbfc6digG2ELoeX1ra5ao9gZl1RQNPccwMekdt0nQitPNDsjylEfRvZ3P3NWysHkQP3Z57QZhoqZ-W86ZYet-4eQB6XFYk__jbTd7vlDX6lGrqH4CbRbqZB2RCVYc-u5a_pHty_ACGWnZEtRp-MFHcT7LoNILoeOaKd1KNFX0oTlkDm4kl8cnzHf7L3jWTH8UCkbPiRVX_Vn_dRA9WMvnVIInx8isBbHQUSgBgXX99YZPpvNTJrMLV5grpgoV3fGcnkpPvQYCkVcjV7zBI6u_x9B0hHAwVLvcIB7VmiClUq5ZzoRfQHLmQVJyICnTJB3e1dYQcqSPqdDzpHqMVcwqaXzRvrFAPOuKaZxQk9y_xdf-Lp',
		realEstateId: 23336272
	})
	
	// sendApart(requestData)
	// 	.then(response => {
	// 		console.log('Response from server:', response)
	// 	})
	// 	.catch(error => {
	// 		console.error('Error:', error)
	// 	})
	
	// let result = await UserService.checkUserExists(ctx.from.id)
	// // делаем есть ли аккаунт и подписка
	// if (result.user && result.subscribe === true) {
	// 	await ctx.scene.enter('userManagerScene')
	// } else {
	// 	// вызываем меню подписки
	// 	await ctx.scene.enter('startScene')
	// }
}

function sendApart(data) {

}


async function findLocation(query) {
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

async function filterApartments(apartments) {
	return apartments.filter(item => {
		return item.priceRaw >= 300 && item.priceRaw <= 800
	})
}

async function getApartments(location) {
	
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

module.exports = start