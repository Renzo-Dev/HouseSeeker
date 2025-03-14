// const axios = require('axios')

(async () => {
	const {sendRequest} = require('./services/Apartment')
	const {getToken} = require('./services/Apartment')
	let token = await getToken()
	console.log('Token: ', token)
	// await sendRequest(token)
})()

// let token = await getToken()


// (async () => {
// 	const puppeteer = require('puppeteer')
// 	// запускаем браузер
// 	const browser = await puppeteer.launch()
// 	const page = await browser.newPage()
//
// 	// переходим на страницу с recaptcha
// 	await page.goto('http://localhost:3000')
//
// 	// вставляем скрипт с reCaptcha на страницу
// 	await page.addScriptTag({url: 'https://www.google.com/recaptcha/api.js?render=6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC'})
// 	// Ждем, пока reCAPTCHA загрузится
// 	await page.waitForFunction(() => typeof grecaptcha !== 'undefined')
// 	console.log(await page.evaluate(async () => {
// 		return await grecaptcha.execute('6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC', {action: 'submit'})
// 	}))
//
// 	// Выполняем reCAPTCHA и получаем токен
// 	// const token = await page.evaluate(async () => {
// 	// 	return await grecaptcha.execute('6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC', { action: 'submit' });
// 	// });
// 	// console.log('Token:', token);
//
// 	// Закрываем браузер
// 	await browser.close()
// })()