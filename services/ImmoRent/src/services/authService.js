async function getToken() {
	const puppeteer = require('puppeteer')
	try {
		const browser = await puppeteer.launch({
			// executablePath: '/root/.cache/puppeteer/chrome/linux-136.0.7099.0/chrome-linux64/chrome',
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		})
		
		const page = await browser.newPage()
		
		await page.goto('https://www.immobilienscout24.de/expose/155937222#/', {waitUntil: 'networkidle2'})
		
		await page.addScriptTag({url: 'https://www.google.com/recaptcha/api.js?render=6LdvKtgUAAAAAClFdC9PRuRKnjndBgRNfkGle7oK'})
		
		await page.waitForFunction(() => typeof grecaptcha !== 'undefined')
		
		await page.waitForFunction('typeof grecaptcha !== "undefined" && typeof grecaptcha.execute === "function"')
		
		let token = await page.evaluate(async () => {
			return grecaptcha.execute('6LdvKtgUAAAAAClFdC9PRuRKnjndBgRNfkGle7oK', {action: 'submit'})
		})
		
		
		setTimeout(async () => {
			await browser.close()
		}, 1000)
		
		return token
	} catch (error) {
		console.error('Error while fetching reCAPTCHA token:', error)
		throw error
	}
}


(async () => {
	let token = await getToken()
	console.log(token)
})()