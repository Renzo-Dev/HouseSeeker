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

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
	simulateHumanInteraction,
	delay,
}