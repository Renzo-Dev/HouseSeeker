/**
 * Retrieves a token by interacting with a reCAPTCHA service using Puppeteer.
 * The function launches a headless browser, navigates to the reCAPTCHA server URL,
 * waits for the necessary reCAPTCHA script to load, and executes it to obtain the token.
 *
 * @returns {Promise<string>} The generated token from the reCAPTCHA service.
 */
async function getToken() {
	const puppeteer = require('puppeteer')
	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		})
		
		const page = await browser.newPage()
		
		await page.goto('http://recaptcha_server:3000/', {waitUntil: 'networkidle2'})
		
		await page.waitForFunction(
			'typeof grecaptcha !== "undefined" && typeof grecaptcha.execute === "function"',
			{timeout: 30000} // Timeout after 30 seconds
		)
		
		// Executes reCAPTCHA and retrieves the token
		// const token = await page.evaluate(() => {
		// 		return grecaptcha.execute('6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC', {action: 'submit'})
		// 	}
		// )
		
		let token = await page.evaluate(async () => grecaptcha.execute('6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC', {action: 'submit'}))
		
		await browser.close()
		return token
	} catch (error) {
		console.error('Error while fetching reCAPTCHA token:', error)
		throw error
	}
}

module.exports = getToken

// async function getToken() {
// 	const puppeteer = require('puppeteer')
// 	try {
// 		const browser = await puppeteer.launch({
// 			headless: true,
// 			args: ['--no-sandbox', '--disable-setuid-sandbox']
// 		})
//
// 		const page = await browser.newPage()
//
// 		await page.goto('http://recaptcha_server:3000/', {waitUntil: 'networkidle2'})
//
// 		await page.waitForFunction('typeof grecaptcha !== "undefined" && typeof grecaptcha.execute === "function"', {
// 			timeout: 30000 // Тайм-аут 30 секунд
// 		})
//
// 		let token = await page.evaluate(async () => {
// 			return grecaptcha.execute('6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC', {action: 'submit'})
// 		})
//
// 		// console.log(await page.evaluate(async () => {
// 		// 	return grecaptcha.execute('6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC', {action: 'submit'})
// 		// }))
//
// 		// setTimeout(async () => {
// 		// 	await browser.close()
// 		//
// 		// }, 3000)
// 		await browser.close()
// 		return token
// 	} catch (error) {
// 		console.log(error)
// 	}
// }
//
// module.exports = getToken