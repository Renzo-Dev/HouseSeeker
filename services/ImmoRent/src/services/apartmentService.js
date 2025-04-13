async function filterApartments(
	apartments,
	minPrice,
	maxPrice,
	minRooms,
	maxRooms
) {
	return apartments.filter((apartment) => {
		const realEstate = apartment['resultlist.realEstate']
		const price = realEstate?.price?.value
		const rooms = realEstate?.numberOfRooms

		// Проверка: цена должна быть в заданном диапазоне
		return (
			price >= minPrice &&
			price <= maxPrice &&
			minRooms >= rooms &&
			rooms <= maxRooms
		)
	})
}

async function getApartments(city) {
	const { delay } = require('./simulateHuman')
	const puppeteer = require('puppeteer')
	const browser = await puppeteer.launch({
		headless: true,
		executablePath:
			'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-blink-features=AutomationControlled',
		],
		ignoreDefaultArgs: ['--enable-automation'],
	})

	const page = await browser.newPage()
	await page.evaluateOnNewDocument(() => {
		Object.defineProperty(navigator, 'webdriver', {
			get: () => false,
		})
	})

	await page.setUserAgent(
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
	)

	console.clear()
	console.log('🌍 Открытие страницы...')
	await page.goto('https://www.immobilienscout24.de', {
		waitUntil: 'domcontentloaded',
	})

	await delay(1000)

	const apartmentsData = []
	const BASE_URL = 'https://www.immobilienscout24.de'
	const SEARCH_URL = `${BASE_URL}/Suche/de/nordrhein-westfalen/koeln/wohnung-mieten?pricetype=rentpermonth`
	const InitPage = await page.evaluate(async () => {
		const res = await fetch(
			'https://www.immobilienscout24.de/Suche/de/nordrhein-westfalen/koeln/wohnung-mieten?pricetype=rentpermonth',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Accept-Language': 'ru-RU,ru;q=0.5',
				},
				credentials: 'include',
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
						numberOfListings,
					},
					resultlistEntries: [{ resultlistEntry: apartment }],
				},
			} = {},
		} = await res.json()

		const data = {
			searchId,
			numberOfPages,
			pageNumber,
			pageSize,
			numberOfHits,
			numberOfListings,
			apartment,
		}
		return data
	})

	apartmentsData.push(InitPage)

	const apartmentPages = await page.evaluate(async (numbersOfPages) => {
		const apartments = []

		for (let i = 2; i <= numbersOfPages; i++) {
			const res = await fetch(
				`https://www.immobilienscout24.de/Suche/de/nordrhein-westfalen/koeln/wohnung-mieten?pricetype=rentpermonth&pagenumber=${i}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Accept-Language': 'ru-RU,ru;q=0.5',
					},
					credentials: 'include',
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
							numberOfListings,
						},
						resultlistEntries: [{ resultlistEntry: apartment }],
					},
				} = {},
			} = await res.json()
			const data = {
				searchId,
				numberOfPages,
				pageNumber,
				pageSize,
				numberOfHits,
				numberOfListings,
				apartment,
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

async function getLocationUrl(location) {
	const { delay } = require('./simulateHuman')
	const puppeteer = require('puppeteer')

	const browser = await puppeteer.launch({
		headless: false,
		executablePath:
			'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-blink-features=AutomationControlled',
		],
		ignoreDefaultArgs: ['--enable-automation'],
	})

	const page = await browser.newPage()
	await page.evaluateOnNewDocument(() => {
		Object.defineProperty(navigator, 'webdriver', {
			get: () => false,
		})
	})

	await page.setUserAgent(
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
	)

	await page.goto(`https://www.immobilienscout24.de/`, {
		waitUntil: 'domcontentloaded',
	})

	await page.setExtraHTTPHeaders({
		'sec-ch-ua':
			'"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'Sec-Fetch-Dest': 'document',
		'Sec-Fetch-Mode': 'navigate',
		'Sec-Fetch-Site': 'none',
		'Sec-Fetch-User': '?1',
		Referer: 'https://www.meinimmobilienscout24.de/',
	})

	return await page.evaluate(async () => {
		return await fetch(
			'https://www.immobilienscout24.de/geoautocomplete/v4.0/DEU?i=Köln&t=country%2Cregion%2Ccity%2CquarterOrTown%2Cquarter%2Cdistrict%2Cpostcode%2CtrainStation%2Cstreet%2Caddress&f=shapeAvailable&dataset=nextgen',
			{
				headers: {
					accept: '*/*',
					'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
					priority: 'u=1, i',
					'sec-ch-ua':
						'"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
					'sec-ch-ua-mobile': '?0',
					'sec-ch-ua-platform': '"Windows"',
					'sec-fetch-dest': 'empty',
					'sec-fetch-mode': 'navigate',
					'sec-fetch-site': 'same-origin',
					'x-is24-gac': '49f5bf376feed3a0f0a52abb46c0dc90',
					'x-requested-with': 'XMLHttpRequest',
				},
				referrer: 'https://www.meinimmobilienscout24.de/',
				referrerPolicy: 'unsafe-url',
				body: null,
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			}
		)
			.then((response) => response.json())
			.then((data) => {
				return data
			})
			.catch((error) => {
				console.error('Ошибка при запросе:', error)
				return null
			})
	})
}

module.exports = { filterApartments, getApartments, getLocationUrl }
