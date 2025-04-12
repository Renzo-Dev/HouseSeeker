async function filterApartments(minPrice, maxPrice, minRooms, maxRooms) {
	const apartments = await getApartments()

	return apartments.filter(apartment => {
		const realEstate = apartment['resultlist.realEstate'];
		const price = realEstate?.price?.value;
		const rooms = realEstate?.numberOfRooms;
		
		// Проверка: цена должна быть в заданном диапазоне
		return (price >= minPrice && price <= maxPrice) && (minRooms >= rooms && rooms <= maxRooms);
	});
}

async function getApartments() {
	const {delay} = require('./simulateHuman')
	const puppeteer = require('puppeteer')
	const browser = await puppeteer.launch({
		headless: true,
		executablePath:
			'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
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
	
	console.clear()
	console.log('🌍 Открытие страницы...')
	await page.goto('https://www.immobilienscout24.de', {
		waitUntil: 'domcontentloaded'
	})
	
	await delay(1000)
	console.clear()
	
	const apartmentsData = []
	const InitPage = await page.evaluate(async () => {
		const res = await fetch(
			'https://www.immobilienscout24.de/Suche/de/nordrhein-westfalen/koeln/wohnung-mieten?pricetype=rentpermonth',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Accept-Language': 'ru-RU,ru;q=0.5'
				},
				credentials: 'include'
			}
		)
		// Получаем данные с сайта и деструктурируем их для получения:
		// - searchId - id поиска
		// - pageNumber - номер текущей страницы
		// - pageSize - количество элементов на странице
		// - numberOfHits - общее количество найденных квартир
		// - numberOfListings - количество объявлений
		// - apartment - информация о квартире
		const {
			searchResponseModel: {
				'resultlist.resultlist': {
					searchId,
					paging: {
						pageNumber,
						pageSize,
						numberOfHits,
						numberOfPages,
						numberOfListings
					},
					resultlistEntries: [{resultlistEntry: apartment}]
				}
			} = {}
		} = await res.json()
		
		const data = {
			searchId,
			numberOfPages,
			pageNumber,
			pageSize,
			numberOfHits,
			numberOfListings,
			apartment
		}
		return data
	})
	
	apartmentsData.push(InitPage)
	
	await delay(1000)
	
	// console.log(InitPage.numberOfPages, InitPage.pageSize)
	
	const apartmentPages = await page.evaluate(async (numbersOfPages) => {
		const apartments = []
		
		for (let i = 2; i <= numbersOfPages; i++) {
			const res = await fetch(
				`https://www.immobilienscout24.de/Suche/de/nordrhein-westfalen/koeln/wohnung-mieten?pricetype=rentpermonth&pagenumber=${i}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Accept-Language': 'ru-RU,ru;q=0.5'
					},
					credentials: 'include'
				}
			)
			
			const {
				searchResponseModel: {
					'resultlist.resultlist': {
						searchId,
						paging: {
							pageNumber,
							pageSize,
							numberOfHits,
							numberOfPages,
							numberOfListings
						},
						resultlistEntries: [{resultlistEntry: apartment}]
					}
				} = {}
			} = await res.json()
			const data = {
				searchId,
				numberOfPages,
				pageNumber,
				pageSize,
				numberOfHits,
				numberOfListings,
				apartment
			}
			apartments.push(data)
		}
		return apartments
	}, InitPage.numberOfPages)
	
	apartmentsData.push(...apartmentPages)
	
	await browser.close()
	
	return apartmentsData
		.flatMap((page) => page.apartment)
		.filter(
			(apartment) =>
				apartment['resultlist.realEstate']?.privateOffer === 'false'
		)
}

module.exports = {filterApartments, getApartments}
