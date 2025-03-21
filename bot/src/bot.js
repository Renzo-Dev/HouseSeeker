const {Telegraf, Scenes, session} = require('telegraf')
const LocalSession = require('telegraf-session-local')
const {botToken} = require('./config')
const {Commands} = require('./commands/commands')
const subscribeScene = require('./scenes/subscribeScene')
const startScene = require('./scenes/startScene')
const userManager = require('./scenes/userManagerScene')
const editDetailsScene = require('./scenes/editDetailsScene')

const bot = new Telegraf(botToken)
const stage = new Scenes.Stage([subscribeScene, startScene, userManager, editDetailsScene])

// Инициализация сессии
const localSession = new LocalSession({
	database: 'session_db.json'
})

bot.use(localSession.middleware())
bot.use(stage.middleware())
// bot.use(session())

const commands = new Commands(bot)

async function bot_init() {
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
		await bot.launch()
		
		console.log('✅ Бот успешно запущен!')
	} catch (err) {
		console.error('❌ Ошибка при запуске бота:', err)
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
