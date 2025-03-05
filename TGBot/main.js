import dotenv from 'dotenv'
import {Scenes, session, Telegraf} from 'telegraf'
import commands from './commands/commands.js'
import {clearPendingUpdates} from './utils/helpers.js'
import dataWizard from './scenes/dataWizard.js'
import startScene from './scenes/startScene.js'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)
let stage = new Scenes.Stage([dataWizard, startScene])

// Подключаем middleware для работы с сессиями и сценами
bot.use(session())
bot.use(stage.middleware())

// Устанавливаем описание бота
bot.telegram.setMyDescription(
	'🏡 Welcome to RentBot! We help you find and apply for apartments.\n' +
	'🏡 Добро пожаловать в RentBot! Мы помогаем находить и подавать заявки на аренду.\n' +
	'🏡 ¡Bienvenido a RentBot! Te ayudamos a encontrar y solicitar apartamentos.\n' +
	'🏡 Willkommen bei RentBot! Wir helfen Ihnen, Wohnungen zu finden und sich zu bewerben.'
)

// инициализируем команды бота
commands.forEach(({command, action}) => {
	bot.command(command, async (ctx) => {
		await action(ctx)
	})
})

console.log('✅ Команды проинициализированы\n')
commands.forEach(({command, action}) => {
	console.log(`👉 Команда: /${command}`)
})
clearPendingUpdates()

// Запуск бота
bot.launch()

bot.catch(async (err, ctx) => {
	if (err.response && err.response.error_code === 403) {
		console.log(`❌ Бот заблокирован пользователем: ${ctx.from.id}`)
		await ctx.scene.leave()
	} else {
		console.error('⚠️ Ошибка в боте:', err)
	}
})