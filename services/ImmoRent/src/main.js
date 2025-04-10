;(async () => {
	const {
		getApartments,
		filterApartments
	} = require('./services/apartmentService')
	
	try {
		const apartments = await getApartments()
		console.log(apartments.length)
	// 	const results = await Promise.all(
	// 		apartments.map(async (apartment) => {
	// 			const realEstate = apartment['resultlist.realEstate']
	// 			// Безопасное извлечение значений
	// 			const title = realEstate?.title || 'Без названия'
	// 			const numberOfRooms = realEstate?.numberOfRooms ?? '—'
	// 			const totalRent =
	// 				realEstate?.calculatedTotalRent?.totalRent?.value ?? '—'
	// 			const rentCurrency =
	// 				realEstate?.calculatedTotalRent?.totalRent?.currency ?? ''
	// 			return {
	// 				title,
	// 				numberOfRooms,
	// 				totalRent,
	// 				rentCurrency
	// 			}
	// 		})
	// 	)
	
	//
	// 	// Вывод
	// 	results.forEach(({title, numberOfRooms, totalRent, rentCurrency}) => {
	// 		console.log(`🏠 ${title}`)
	// 		console.log(`   Комнат: ${numberOfRooms}`)
	// 		console.log(`   Общая аренда: ${totalRent} ${rentCurrency}\n`)
	// 	})
	} catch (error) {
		console.error('Ошибка при получении квартир:', error)
	}
})()
// const apartments = await getApartments()
// for (const apartment of apartments) {
// 	const realEstate = apartment['resultlist.realEstate']

// 	const numberOfRooms = realEstate.numberOfRooms
// 	const totalRent = realEstate.calculatedTotalRent?.totalRent?.value
// 	const rentCurrency = realEstate.calculatedTotalRent?.totalRent?.currency

// 	console.log(`🏠 ${realEstate.title}`)
// 	console.log(`   Комнат: ${numberOfRooms}`)
// 	console.log(`   Общая аренда: ${totalRent} ${rentCurrency}`)
// }

// apartments.forEach((apartment) => {
// console.log(1)
// })

// const filteredApartments = filterApartments(apartments, 1000, 2000, 1, 2)
// console.log(filteredApartments.length)
// })()

/* (async () => {
	const {delay} = require('./services/simulateHuman')
	const puppeteer = require('puppeteer')
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
	
	// ПОЛУЧАЕМ СПИСОК КВАРТИР
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
})() */
