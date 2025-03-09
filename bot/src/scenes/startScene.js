const {Scenes} = require('telegraf')
const Locales = require('../utils/locales')
const exitScene = require('./exitScene')
let msg = {}

const startScene = new Scenes.WizardScene(
	'startScene',
	async (ctx) => {
		// Определяем язык пользователя, если не найден, ставим английский по умолчанию
		msg = new Locales(ctx.from.language_code).getSection('start')
		await ctx.reply(msg.welcome, {
			parse_mode: 'HTML',
			reply_markup: {
				keyboard: [[msg.cancel], [msg.continue]],
				resize_keyboard: true,
				one_time_keyboard: true
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		msg = new Locales(ctx.from.language_code).getSection('start')
		if (ctx.message.text === msg.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.continue || ctx.message.text === '/subscribe') {
			await ctx.scene.enter('dataWizard')
		}
	}
)

module.exports = startScene