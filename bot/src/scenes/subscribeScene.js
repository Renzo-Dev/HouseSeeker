const {Scenes} = require('telegraf')
const exitScene = require('./exitScene')
const Locales = require('../utils/locales')
const generateFreeKassaSignature = require('../utils/FreeKassa')
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
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		
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
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message && ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['1'], {
				parse_mode: 'Markdown',
				reply_markup: {
					keyboard: [[msg.buttons.cancel]],
					resize_keyboard: true,
					one_time_keyboard: false
				}
			})
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
	// Email
	async (ctx) => {
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message && ctx.message.text === msg.buttons.back) {
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
	// Min Price
	async (ctx) => {
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message && ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['3'])
			return ctx.wizard.selectStep(3)
		}
		
		ctx.scene.state.userData.email = ctx.message.text
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
	// Max Price
	async (ctx) => {
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message && ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['4'])
			return ctx.wizard.selectStep(4)
		}
		
		ctx.scene.state.userData.minPrice = ctx.message.text
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
	// Min Rooms
	async (ctx) => {
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message && ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['5'])
			return ctx.wizard.selectStep(5)
		}
		
		ctx.scene.state.userData.maxPrice = ctx.message.text
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
	// Max Rooms
	async (ctx) => {
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message && ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['6'])
			return ctx.wizard.selectStep(6)
		}
		
		ctx.scene.state.userData.minRooms = ctx.message.text
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
	// City
	async (ctx) => {
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message && ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['7'])
			return ctx.wizard.selectStep(7)
		}
		ctx.scene.state.userData.maxRooms = ctx.message.text
		await ctx.reply(msg.steps['9'], {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [[msg.buttons.back, msg.buttons.cancel]],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	// Description
	async (ctx) => {
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message && ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['8'])
			return ctx.wizard.selectStep(8)
		}
		ctx.scene.state.userData.city = ctx.message.text
		await ctx.reply(msg.steps['10'], {
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
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message && ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['9'])
			return ctx.wizard.selectStep(9)
		}
		
		ctx.scene.state.userData.description = ctx.message.text
		
		const summary = msg.summary
			.replace('{name}', ctx.scene.state.userData.name || '❌')
			.replace('{surname}', ctx.scene.state.userData.surname || '❌')
			.replace('{email}', ctx.scene.state.userData.email || '❌')
			.replace('{phone}', ctx.scene.state.userData.phone || '❌')
			.replace('{minPrice}', ctx.scene.state.userData.minPrice || '❌')
			.replace('{maxPrice}', ctx.scene.state.userData.maxPrice || '❌')
			.replace('{minRooms}', ctx.scene.state.userData.minRooms || '❌')
			.replace('{maxRooms}', ctx.scene.state.userData.maxRooms || '❌')
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
		msg = new Locales(ctx.from.language_code).getSection('subscribe')
		if (ctx.message && ctx.message.text === msg.buttons.cancel) return exitScene(ctx)
		if (ctx.message && ctx.message.text === msg.buttons.confirm) {
			// ПОДТВЕРЖДАЕМ И ПЕРЕХОДИМ НА СЛЕД ШАГ ЭТО ГЕНЕРАЦИЯ ССЫЛКИ ДЛЯ ОПЛАТЫ
			const shopId = '60798'
			const secret = '3N8S5M0W51}a3B?'
			const currency = 'UAH'
			const amount = 501.00 // или ctx.scene.state.userData.amount
			const orderId = `${ctx.from.id}_${Date.now()}`
			const signature = generateFreeKassaSignature(shopId, amount, secret, currency, orderId)
			
			const paymentUrl = `https://pay.freekassa.ru/?m=${shopId}&oa=${amount}&o=${orderId}&s=${signature}&currency=${currency}`
			
			// добавляем данные в бд
			
			let userData = JSON.stringify(ctx.scene.state.userData)
			// console.log(userData)
			
			await ctx.reply(`💳 Вот ссылка для оплаты:\n[Оплатить ${amount} ${currency}](${paymentUrl})`, {
				parse_mode: 'Markdown',
				disable_web_page_preview: true
			})
		}
		if (ctx.message && ctx.message.text === msg.buttons.back) {
			await ctx.reply(msg.steps['10'], {
				parse_mode: 'Markdown',
				reply_markup: {
					keyboard: [[msg.buttons.back, msg.buttons.cancel]],
					resize_keyboard: true,
					one_time_keyboard: false
				}
			})
			return ctx.wizard.selectStep(10)
		}
	}
)

module.exports = subscribeScene