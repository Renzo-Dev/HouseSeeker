async function sendApartmentRequest() {
	const {getActiveSubscribes} = require('./database/repository/subscribeRepository')
	const {getUserByUserId} = require('./database/repository/userRequests')
	const {getAllSentRequests} = require('./database/repository/sent_requestsRepository')
	const getToken = require('./getToken')

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
	
	// получаем локацию ( город ) для пользователя
	await Promise.all(users.map(async (user) => {
		// получаем локацию с соответствии с городом
		let locationData = await getLocationForUser(user.city)
		
		// получаем список отправленных квартир пользователем
		let sentApartments = await getAllSentRequests(user.id)
		// получаем список квартир с сайта, фильтруем квартиры в соответствии с данными пользователя
		let apartments = await filterApartments(await getApartments(locationData.location, locationData.cookie), user.min_price, user.max_price, user.min_rooms, user.max_rooms)
		// отправляем заявки ( проверяем квартиру с списком квартир отправленных пользователем )
		await Promise.all(apartments.map(async (apartment) => {
			const isSent = sentApartments.some(sentApartment => apartment.exposeeId === sentApartment.house_id)
			
			if (!isSent) {
				// console.log(user)
				// если не отправлено
				// отправляем
				// console.log(apartment)
				let token = await getToken()
				
				
				console.log('Квартира: ' + apartment.exposeeId + ' отправляем')
			} else {
				console.log('Квартира: ' + apartment.exposeeId + ' не отправлен')
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
			if (!item.title.toLowerCase().includes('tauschwohnung')) {
				return item.priceRaw >= minPrice && item.priceRaw <= maxPrice && item.rooms >= minRooms && item.rooms <= maxRooms
			}
		}
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

async function sendRequest(token, user, exposeeId) {
	const axios = require('axios')
	try {
		let SERVICE_URL = 'https://www.meinestadt.de/_re-service/contact'
		console.log(SERVICE_URL)
		
		console.log(token)
		let formData = {
			email: user.email,
			salutation: 'm',
			firstname: user.first_name,
			lastname: user.last_name,
			message: user.description,
			captchaToken: token,
			phone: user.phone
		}
		
		await axios.post(SERVICE_URL, {
				...formData,
				realEstateId: exposeeId
			}, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Cookie': '__Secure-3PSID=g.a000ugg8m7VGwXZ6xfYaCj5gVbUKHgFES8o_LOPsPuRNHV3DoNK2613nuNqHSRf_gqd3Ik6B-wACgYKAakSARMSFQHGX2MiRd0W_zl5dEsxwpI0qzC6NBoVAUF8yKoA24pa7ahNNRBkk1k5z0cO0076; __Secure-3PAPISID=I816GiKDaKO7w_VV/A7mSZEysM2bMoj2pC; NID=522=F548f6B9y1v2xV1beo27PsvbYFAJjNZAfN24exauql5tz0B5SERdc4GtyUuUWNkmv54i3G7O_PcAl_k4q1I541MFKJgdP_l8ljEP1o9dq1JisZCBQjyiaNvTRWvJJGPogVrWkJnSUTkZCSanVxC388PE17PVyOWwC9nfMEBZfom8iIRIUwc_1hVFhzTbMWlKxQ5ECb-bV7t1nhBis0VcpNNVuT-xJhurhZTv5sCVU8OPVx1fmiM3TV11aWhTz5HiDwhvmsXGgq7t9lRwmLGXG77Dp1t31TejMMuVLMJqtgRmeHpgsZWpcyL2KlnlE1H6EgdJPegociaypG77O-0iYgPQTIgWaXQTF6lLuqmi2M_re8HNLOrHggUMiXbuvlGEyLRR7wSd8cICqItnfQHvDopntiBqJ_14_QAVFyGJIKY_Alinau1RY4APrResb62b5JebpEtFw8dK0zesj_2_Qome6VSSkXj62GnZojW29SdqIz0FpS-JCN6xT5sg7AvxBei5da6wunRX4iK1MJ5KIBytJKwYTyvD6R6HnRHtUCCdNBF5UUcoslNFkrj_7S5ePiDmH-JBEkANQwF5oFhF3cuaznXCmIWGqvaTrush5CwV2v85tpcV3DlC2MXB8N0OoCnVjt1pWpRY1wr645pI5bGpML1eQpdXTSgaqxclS4CABP2kAiUMFd-koYhtbUCDojR9BkhKdLPcSZPXMGeVWA-OwESX6hi_AXHzDb7JJsXFK4Hq-fb4LciZrrtK9XTgV7tuFKTDApPCa27ONxCOo76zyd_T5vWfQXVqPkVsUuymk_Hcx2b6axp20FFe8MQESYU7LX6Z2dllt4K_zsyl1nrC51iOCDpMYXMJ4hGMzq7htfQTa2qXptRUrhoR0M0cSicNOO_rikqePdrpstLusyAE2kXA_2vtM3UsMCuaSDeqa7HINqdDAyz3ZQkjbyZJbgYU1xte8F_c3laIgSnBK_UPACROWFmd2T98cH8jfFZXqDyFdWPpI6Rh6qhXuDPRAdf2vrtlxPhApWJhqi8C1vWP720CSAuwlMAXvu5BwEAgj-57OoNvXsb_07v4RZP1GfmU3HM2i7pfHXS6ukY0wBbZAus-hoHaXT6ke0saIdSU18Yb0FzGgdgN7WyTD9Kqgmgun5q-LmqD-Ufc0h7mmpLGg6bP9vWZj3xsFzUfGcgzppQtK1opbdtw46w-9FuJHTYc8WdzqO8G2Uo1L6UATqr1Xjfn7Wk0ruFJB4xo6VV7zwLOL5GNAfIHrOdjR5kAIEwmG1nbTUqmbjeEMrDT9THbuTIY4Zetw9olblITCapH0cfV3bWDtfAnhibXcRFAmTh_Icmu5pQZDpnNoszrcJcYAmCETshlH_Jlfm_Tde5uYmy-KHwnVECsEEB9xtVC3j1mr5coABvlmaz_iE29QfVXuvX5JGzISJZInusEfRrj_ygHONI4ZoEDd97ByK5O9wYF41zRlwXFYYw5E56Rgo5tVRELCC8z51s5_9LMf8RKd2D5LLriHAIx7zRLaTlp_nhBLyrrbXcr-P5TEIm0kzM8tE_d0kJWD8_jau4MXxPx2bZ-6AAVourxKclOgNoJrvPWzKhY-_67odMW9ykDSr9TUgcDNdMA7q-6h6kxa-c7avq1gv_uf-PSjsAF_qytl9FIQZ4ruZ1EJQie99SAZDRLIHgK4M8otQzSpnllo28_1PTnmuzCEVXpHNZxCKi-uQGcD7pO9UAV44cfrHUwahKKFFvWYPBPbeER3n1T_I2kgjhvSFJuL1I; __Secure-3PSIDTS=sidts-CjEBEJ3XV3mIvW072BDgOTImIRDt8a8m1Ud16DQ46bJEh0fM493ji4Ije4EbsgcpxQOTEAA; __Secure-3PSIDCC=AKEyXzWWrfqE7tYT838tNp_NMU3PjKuvTwOLlmeQcwezW7KNU3KaBXTU98ZgwBQCw_y_F7jdaz0'
				}
			}
		).then(response => {
			console.log(response.status, response.data)
		})
		console.log('Заявка отправлена')
		return true
	} catch (error) {
		console.error('Ошибка:', error.message)
		return false
	}
}


module.exports = {sendApartmentRequest, getLocationForUser, getApartments}
