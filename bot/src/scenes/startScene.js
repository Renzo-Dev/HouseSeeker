const Locales = require('../utils/locales')
const {Scenes} = require('telegraf')
const startScene = new Scenes.WizardScene(
	'startScene',
	async (ctx) => {
		try {
			const locales = new Locales(ctx.from.language_code)
			msg = locales.getSection('start')
			
			if (!msg || !msg.welcome || !msg.cancel || !msg.continue) {
				throw new Error('Локализация неполная или отсутствует')
			}
		} catch (err) {
			console.error('❌ Ошибка загрузки локализации для startScene:', err.message)
			await ctx.reply('Произошла ошибка локализации. Попробуйте позже.')
			return ctx.scene.leave()
		}
		
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
			await ctx.scene.enter('subscribeScene')
		}
	}
)
