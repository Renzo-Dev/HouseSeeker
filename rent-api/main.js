(async () => {
	const {getToken} = require('./services/Apartment')
	const {sendRequest} = require('./services/Apartment')
	const {findLocation} = require('./services/Apartment')
	const {filterApartments} = require('./services/Apartment')
	const {getApartments} = require('./services/Apartment')
	let location = await findLocation('Köln')
	console.log(location)
	let apartments = await getApartments(location)
	let filteredApartments = await filterApartments(apartments)
	

	// let token = await getToken()
	// await sendRequest(token, filteredApartments[0].exposeeId)
	
	// filteredApartments.forEach(item => {
	// 	console.log(item.exposeeId)
	// })
	
	
	
	
	for (let i = 13; i < 15; i++) {
		let token = await getToken()
		await sendRequest(token, filteredApartments[i].exposeeId)
		console.log(`Sents: ${i}`)
	}
	// console.log(filteredApartments.length)
})()


// const axios = require('axios')

// (async () => {
// 	const {sendRequest} = require('./services/Apartment')
// 	const {getToken} = require('./services/Apartment')
// 	let token = await getToken()
// 	console.log('Token: ', token)
// 	// await sendRequest(token)
// })()

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