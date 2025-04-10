async function getToken() {
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

	console.log('🌍 Открытие страницы...')
	await page.goto('https://www.immobilienscout24.de/expose/155937222#/', {
		waitUntil: 'domcontentloaded',
	})

	await delay(1000)

	let res = await page.evaluate(async () => {
		const model = window.IS24.contactLayerModel
		return model
	})

	const cookies = await page.cookies()
	const cookieString = cookies.map((c) => `${c.name}=${c.value}`).join('; ')
	// console.log('🍪 Cookie:', cookieString)

	await browser.close()
	return res
	console.log('✅ Завершено.')
}

;(async () => {
	let token = await getToken()
	console.log(token)
})()
