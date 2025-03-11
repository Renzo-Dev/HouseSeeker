const {Scenes, Markup} = require('telegraf')
const Locales = require('../utils/locales')
const exitScene = require('./exitScene')

let msg
const userManagerScene = new Scenes.WizardScene(
	'userManagerScene',
	async (ctx) => {
		msg = new Locales(ctx.from.language_code).getSection('manager')
		await ctx.reply(msg.text, {
			reply_markup: {
				keyboard: [
					[msg.buttons.my_requests, msg.buttons.edit_profile],
					[msg.buttons.subscription, msg.buttons.support]
				],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.scene.leave()
		// return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === msg.buttons.edit_profile) return ctx.scene.enter('editDetailsScene')
	}
)

module.exports = userManagerScene