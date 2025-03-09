const {Scenes} = require('telegraf')
const exitScene = require('./exitScene')
const Locales = require('../utils/locales')
let msg
const subscribeScene = new Scenes.WizardScene(
	'subscribeScene',
	// First name
	async (ctx) => {
		ctx.scene.state.userData = {}
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		await ctx.reply(msg.steps['1'], {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [[msg.buttons.cancel]],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	
	// Last Name
	async (ctx) => {
		if (ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['1'])
			return ctx.wizard.selectStep(1)
		}
		
		ctx.scene.state.userData.name = ctx.message.text
		await ctx.reply(msg.steps['2'], {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [[msg.buttons.back, msg.buttons.cancel]],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	
	// Phone number
	async (ctx) => {
		if (ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['1'])
			return ctx.wizard.selectStep(1)
		}
		
		ctx.scene.state.userData.surname = ctx.message.text
		await ctx.reply(msg.steps['3'], {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [[msg.buttons.back, msg.buttons.cancel]],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['2'])
			return ctx.wizard.selectStep(2)
		}
		
		ctx.scene.state.userData.phone = ctx.message.text
		await ctx.reply(msg.steps['4'], {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [[msg.buttons.back, msg.buttons.cancel]],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['3'])
			return ctx.wizard.selectStep(3)
		}
		
		ctx.scene.state.userData.minPrice = ctx.message.text
		await ctx.reply(msg.steps['5'], {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [[msg.buttons.back, msg.buttons.cancel]],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['4'])
			return ctx.wizard.selectStep(4)
		}
		
		ctx.scene.state.userData.maxPrice = ctx.message.text
		await ctx.reply(msg.steps['6'], {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [[msg.buttons.back, msg.buttons.cancel]],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['5'])
			return ctx.wizard.selectStep(5)
		}
		
		ctx.scene.state.userData.rooms = ctx.message.text
		await ctx.reply(msg.steps['7'], {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [[msg.buttons.back, msg.buttons.cancel]],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['6'])
			return ctx.wizard.selectStep(6)
		}
		
		ctx.scene.state.userData.city = ctx.message.text
		await ctx.reply(msg.steps['8'], {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [[msg.buttons.back, msg.buttons.cancel]],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['7'])
			return ctx.wizard.selectStep(7)
		}
		
		ctx.scene.state.userData.description = ctx.message.text
		
		const summary = msg.summary
			.replace('{name}', ctx.scene.state.userData.name || '❌')
			.replace('{surname}', ctx.scene.state.userData.surname || '❌')
			.replace('{phone}', ctx.scene.state.userData.phone || '❌')
			.replace('{minPrice}', ctx.scene.state.userData.minPrice || '❌')
			.replace('{maxPrice}', ctx.scene.state.userData.maxPrice || '❌')
			.replace('{rooms}', ctx.scene.state.userData.rooms || '❌')
			.replace('{city}', ctx.scene.state.userData.city || '❌')
			.replace('{description}', ctx.scene.state.userData.description || '❌')
		
		await ctx.reply(summary, {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [
					[msg.buttons.back, msg.buttons.cancel],
					[msg.buttons.confirm]
				],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message.text === msg.buttons.confirm) {
			// ПОДТВЕРЖДАЕМ И ПЕРЕХОДИМ НА СЛЕД ШАГ ЭТО ГЕНЕРАЦИЯ ССЫЛКИ ДЛЯ ОПЛАТЫ
		}
		if (ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['8'], {
				parse_mode: 'Markdown',
				reply_markup: {
					keyboard: [[msg.buttons.back, msg.buttons.cancel]],
					resize_keyboard: true,
					one_time_keyboard: false
				}
			})
			return ctx.wizard.selectStep(8)
		}
	}
)

module.exports = subscribeScene