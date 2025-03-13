// const axios = require('axios')
// (async () => {
// 	let token = await getToken()
// 	console.log('Token: ', token)
// })()

// let token = await getToken()

async function getToken() {
	const puppeteer = require('puppeteer')
	// запускаем браузер
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	
	// переходим на страницу с recaptcha
	await page.goto('http://localhost:3000')
	// вставляем скрипт с reCaptcha на страницу
	await page.addScriptTag({url: 'https://www.google.com/recaptcha/api.js?render=6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC'})
	// Ждем, пока reCAPTCHA загрузится
	await page.waitForFunction(() => typeof grecaptcha !== 'undefined')
	let token = await page.evaluate(async () => {
		return await grecaptcha.execute('6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC', {action: 'submit'})
	})
	
	// Закрываем браузер
	await browser.close()
	return token
}

async function sendRequest(token) {
	const axios = require('axios')
	try {
		let SERVICE_URL = 'https://www.meinestadt.de/_re-service/contact'
		console.log(SERVICE_URL)
		let exposeeId = 22340244
		
		let formData = {
			email: 'dankoshevoy@gmail.com',
			salutation: 'm',
			firstname: 'Dan',
			lastname: 'Koshevoy',
			message: 'Hi i need home',
			captchaToken: token
		}
		
		await axios.post(SERVICE_URL, {
				...formData,
				realEstateId: exposeeId
			}, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Cookie': 'AMCVS_24D022CE527854F10A490D4D%40AdobeOrg=1; s_cc=true; _sp_v1_p=129; _sp_v1_data=1025453; _sp_su=false; c_tea=,aa,; c_te=1; c_te2=0; consentUUID=9b0bc621-6a80-46c0-8239-32817015d39e_41; consentDate=2025-03-11T17:06:50.355Z; cmp_ms_p=; _sp_v1_ss=1:H4sIAAAAAAAAAItWqo5RKimOUbKKxsrIAzEMamN1YpRSQcy80pwcILsErKC6lgwJJR1MK6FqBpFBRJgYo5SZl1kCZBmamxiaGxpZWFiSFR6xAKjJ7ZKEAQAA; ak_bmsc=AB1EDA754C7A021643F8BE96F8B8E524~000000000000000000000000000000~YAAQHLZlX/gpe4KVAQAAtrSjkBt/9hSIjUdk9zEgdcvm2fHXbEls3RZZWL4DGzoDML9ej/XMFDVHzGVAfFtfeGDp6PowCilo5GqnxL7ufkXmUIGRncYLz/InXg9LKsYg381da1byiKSiahMrvMLgt3Din+DO5PZtILhFx8eZV43hoAHjuNvYurgeFPFdUTvAc+Gv+Il795cP3ko5L1PfKOxAT5VxcX9V/fewT6mAc2pe96dePutrYy3Tp1px4liRZacKtAeymiMWaO4v0FWn8m0Qt1T1qvW+gziVWaGGYf71zTcK/4bTdb42uMxgLzTen9TIOR79+VbiLdlwl1bG/hG5blT1Cn8IYVZVgOa31603bOoNVR1I186gJYrTX6apu3ANFR9V2uS1EGv9vCnzWjkcjwTF5FTefZTs0xAPAfhccxh0xsv7kl+wtpRPUNbYhqRyQQ==; AMCV_24D022CE527854F10A490D4D%40AdobeOrg=-1124106680%7CMCIDTS%7C20161%7CMCMID%7C41441849371494397052549983309530771185%7CMCOPTOUT-1741895603s%7CNONE%7CvVersion%7C5.2.0%7CMCAID%7CNONE%7CMCAAMLH-1742493203%7C6%7CMCAAMB-1742493203%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI; utag_main=v_id:0195862c4b3c000bfdf8aaf3272f0506f001a06700bd0$_sn:8$_se:3$_ss:0$_st:1741890203890$vapi_domain:meinestadt.de$ses_id:1741888401042%3Bexp-session$_pn:2%3Bexp-session; _rdt_uuid=1741713123654.b8bda591-ced9-4b34-b207-0dfcc3e9429d; s_sq=stepstonemeinestadtde%3D%2526c.%2526a.%2526activitymap.%2526page%253Dimmobilien_expose_eigeninventar%2526link%253DAnfrage%252520absenden%2526region%253Dmaincontent%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dimmobilien_expose_eigeninventar%2526pidt%253D1%2526oid%253DAnfrage%252520absenden%2526oidt%253D3%2526ot%253DSUBMIT'
				}
			}
		).then(response => {
			console.log(response.status, response.data)
		})
		console.log('Заявка отправлена')
	} catch (error) {
		console.error('Ошибка:', error.message)
	}
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

module.exports = {
	findLocation,
	filterApartments,
	getApartments,
	getToken,
	sendRequest
}