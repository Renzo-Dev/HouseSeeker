const express = require('express')
const {Telegraf, Scenes, session} = require('telegraf')
const LocalSession = require('telegraf-session-local')
const {botToken, app_port} = require('./config')
const {Commands} = require('./commands/commands')


const app = express()
const bot = new Telegraf(botToken)

// Инициализация сессии
const localSession = new LocalSession({
	database: 'session_db.json'
})


async function bot_init() {
	const subscribeScene = require('./scenes/subscribeScene')
	const startScene = require('./scenes/startScene')
	const editDetailsScene = require('./scenes/editDetailsScene')
	const userManagerScene = require('./scenes/userManagerScene')
	const stage = new Scenes.Stage([
		subscribeScene,
		startScene,
		userManagerScene,
		editDetailsScene
	])
	
	bot.use(localSession.middleware())
	bot.use(stage.middleware())
	
	const commands = new Commands(bot)
	try {
		await bot.telegram.setMyDescription(
			`🏡 *Welcome to Home Seeker!*\n` +
			`Find your perfect home quickly and easily. We help you discover and apply for apartments hassle-free! 🏠✨\n\n` +
			`🏡 *Добро пожаловать в Home Seeker!*\n` +
			`Найдите идеальное жилье быстро и легко. Мы поможем вам с поиском и подачей заявки! 🏠🔍\n\n` +
			`🏡 *Willkommen bei Home Seeker!*\n` +
			`Finden Sie Ihr perfektes Zuhause schnell und mühelos. Wir helfen Ihnen bei der Suche und Bewerbung! 🏠🔍`
		)
		
		await commands.loadCommands()
		
		console.log('Запуск бота')
		// Параллельный запуск бота (без await)

// Обработка текстовых сообщений, отправляя пользователю то, что он ввел
// 		bot.on('text', async (ctx) => {
// 			try {
// 				await ctx.reply(`Вы ввели: ${ctx.message.text}`)
// 			} catch (err) {
// 				console.error('Ошибка при обработке сообщения:', err)
// 			}
// 		})
		bot.launch()
			.then(() => console.log('✅ Бот успешно запущен!'))
			.catch(err => console.error('❌ Ошибка при запуске бота:', err))
		
		// Запускаем HTTP-сервер параллельно
		// const port = app_port || 3000
		// app.use(express.json())
		//
		// app.post('/notify', async (req, res) => {
		// 	const {telegram_id, amount, order_id, status} = req.body
		//
		// 	try {
		// 		if (status === 'success') {
		// 			await bot.telegram.sendMessage(telegram_id, `✅ Оплата прошла успешно на сумму ${amount}₽ (Заказ #${order_id})`)
		// 		} else if (status === 'fail') {
		// 			await bot.telegram.sendMessage(telegram_id, `❌ Оплата не прошла. Попробуйте снова.`)
		// 		}
		// 		res.send('OK')
		// 	} catch (error) {
		// 		console.error('Ошибка при отправке уведомления:', error)
		// 		res.status(500).send('Ошибка')
		// 	}
		// })
		//
		// app.listen(port, () => {
		// 	console.log(`🌐 HTTP-сервер бота запущен на порту ${port}`)
		// })
		
	} catch (err) {
		console.error('❌ Ошибка при инициализации бота:', err)
	}
}


bot.catch(async (err, ctx) => {
	if (err.response?.error_code === 403) {
		console.warn(`❌ Пользователь заблокировал бота: ${ctx.from?.id}`)
		await ctx.scene.leave()
	} else {
		console.error('⚠️ Ошибка в боте:', err)
	}
})

module.exports = {bot, bot_init}
