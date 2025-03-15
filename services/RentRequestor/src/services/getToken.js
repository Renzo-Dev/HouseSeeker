async function getToken() {
	const puppeteer = require('puppeteer')
	// запускаем браузер
	const browser = await puppeteer.launch({
		executablePath: '/usr/bin/chromium-browser', // Adjust if necessary; optional if Chromium is managed by Puppeteer
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		headless: 'new'
	})
	
	const page = await browser.newPage()
	console.log('WORK')
	// переходим на страницу с recaptcha
	await page.goto('http://localhost:3000')
	// вставляем скрипт с reCaptcha на страницу
	// await page.addScriptTag({url: 'https://www.google.com/recaptcha/api.js?render=6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC'})
	// Ждем, пока reCAPTCHA загрузится
	// await page.waitForFunction(() => typeof grecaptcha !== 'undefined')
	let token = await page.evaluate(async () => {
		return await grecaptcha.execute('6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC', {action: 'submit'})
	})
	// const cookies = await page.cookies()
	// console.log(cookies)
	
	// Закрываем браузер
	await browser.close()
	return token
}

module.exports = getToken