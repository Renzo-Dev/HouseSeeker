const {Telegraf, Scenes, session} = require('telegraf')
const {botToken} = require('./config')
const {Commands} = require('./commands/commands')
const subscribeScene = require('./scenes/subscribeWizard')
const startScene = require('./scenes/startScene')

let bot = new Telegraf(botToken)
let stage = new Scenes.Stage([subscribeScene, startScene])

bot.use(session())
bot.use(stage.middleware())

let commands = new Commands(bot)

async function bot_init() {
	await bot.telegram.setMyDescription(
		'🏡 *Welcome to Home Seeker!*\n' +
		'Find your perfect home quickly and easily. We help you discover and apply for apartments hassle-free! 🏠✨\n\n' +
		
		'🏡 *Добро пожаловать в Home Seeker!*\n' +
		'Найдите идеальное жилье быстро и легко. Мы поможем вам с поиском и подачей заявки! 🏠🔍\n\n' +
		
		'🏡 *Willkommen bei Home Seeker!*\n' +
		'Finden Sie Ihr perfektes Zuhause schnell und mühelos. Wir helfen Ihnen bei der Suche und Bewerbung! 🏠✅'
	)
	
	try {
		await commands.loadCommands().then(() => {
			bot.launch() // Запускаем бота
			console.log('✅ Бот запущен!')
		}) // Сначала загружаем команды
	} catch (err) {
		console.log('❌ Ошибка при запуске бота:', err.message)
	}
}


bot.catch(async (err, ctx) => {
	if (err.response && err.response.error_code === 403) {
		console.log(`❌ Пользователь заблокировал бота: ${ctx.from.id}`)
		await ctx.scene.leave()
	} else {
		console.error('⚠️ Ошибка в боте:', err)
	}
})

module.exports = {bot, bot_init}