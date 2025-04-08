const puppeteer = require('puppeteer')

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

async function simulateHumanInteraction(page) {
	console.log('🧠 Имитация человека начата...')
	
	for (let i = 0; i < 7; i++) {
		const x = getRandomInt(50, 1000)
		const y = getRandomInt(50, 700)
		const steps = getRandomInt(5, 10)
		await page.mouse.move(x, y, {steps})
		await delay(getRandomInt(1500, 2000))
	}
	
	console.log('📖 Человек читает страницу...')
	await delay(getRandomInt(1000, 2000))
	
	for (let i = 0; i < 4; i++) {
		const distance = getRandomInt(200, 600)
		await page.evaluate(d => window.scrollBy(0, d), distance)
		await delay(getRandomInt(500, 1000))
	}
	
	await delay(getRandomInt(1000, 2000))
}

(async () => {
	const browser = await puppeteer.launch({
		headless: true,
		executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-blink-features=AutomationControlled'
		],
		ignoreDefaultArgs: ['--enable-automation']
	})
	
	const page = await browser.newPage()
	
	await page.evaluateOnNewDocument(() => {
		Object.defineProperty(navigator, 'webdriver', {
			get: () => false
		})
	})
	
	await page.setUserAgent(
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
	)
	
	console.log('🌍 Открытие страницы...')
	await page.goto('https://www.immobilienscout24.de', {
		waitUntil: 'domcontentloaded'
	})
	
	await delay(3000)
	
	const initialResponse = await page.evaluate(async () => {
		// const res = await fetch('https://www.immobilienscout24.de/Suche/de/nordrhein-westfalen/koeln/wohnung-mieten?pricetype=rentpermonth&pageSize=50', {
		const res = await fetch('https://www.immobilienscout24.de/Suche/de/nordrhein-westfalen/koeln/wohnung-mieten?pricetype=rentpermonth', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Accept-Language': 'ru-RU,ru;q=0.5'
			},
			credentials: 'include'
		})
		return await res.json()
	})
	
	console.log('✅ Квартир: ', initialResponse.searchResponseModel['resultlist.resultlist'].paging.numberOfHits)
	const data = initialResponse.searchResponseModel['resultlist.resultlist']
	const numberOfHits = parseInt(data.paging.numberOfHits)
	const totalPages = Math.ceil(numberOfHits / 50)
	
	let res = await page.evaluate(async (totalPages) => {
		// Массив, в который будут собираться все квартиры со всех страниц
		const allResults = []
		
		// Функция для загрузки одной страницы по номеру
		const fetchPage = async (pageNum) => {
			const url = `https://www.immobilienscout24.de/Suche/de/nordrhein-westfalen/koeln/wohnung-mieten?pricetype=rentpermonth&pageSize=50&pageNumber=${pageNum}`
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Accept-Language': 'ru-RU,ru;q=0.5'
				},
				credentials: 'include'
			})
			const json = await res.json()
			return json?.searchResponseModel?.['resultlist.resultlist']?.resultlistEntries?.[0]?.resultlistEntry || []
		}
		
		const batchSize = 5 // Что бы не заддосить сайт
		
		// Проходим по всем страницам батчами по batchSize
		for (let i = 1; i <= totalPages; i += batchSize) {
			
			const batch = []
			
			// Формируем батч из fetch-запросов
			for (let j = i; j < i + batchSize && j <= totalPages; j++) {
				batch.push(fetchPage(j))
			}
			
			// Дожидаемся выполнения всех запросов в батче
			const batchResults = await Promise.all(batch)
			
			// Объединяем полученные квартиры в общий массив
			batchResults.forEach((entries) => {
				const filtered = entries.filter(entry => entry['resultlist.realEstate']?.privateOffer === 'false')
				allResults.push(...filtered)
			})
			
			// антиперегрузка Пауза между батчами, чтобы не заддосить сервер
			await new Promise(resolve => setTimeout(resolve, 1000))
		}
		
		return allResults
	}, totalPages)
	console.log(`✅ Получено квартир`, res)
	
	const cookies = await page.cookies()
	const cookieString = cookies.map(c => `${c.name}=${c.value}`).join('; ')
	// console.log('🍪 Cookie:', cookieString)
	
	await browser.close()
	console.log('✅ Завершено.')
})()