import {Scenes} from 'telegraf'
import {getText} from '../utils/helpers.js'
import {exitScene} from './exitScene.js'


const startScene = new Scenes.WizardScene(
	'startScene',
	async (ctx) => {
		// Определяем язык пользователя, если не найден, ставим английский по умолчанию
		const msg = getText('start', ctx.from.language_code)
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
		const msg = getText('start', ctx.from.language_code)
		if (ctx.message.text === msg.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.continue || ctx.message.text === '/subscribe') {
			await ctx.scene.enter('dataWizard')
		}
	}
)

export default startScene
