// Создаём сцену для последовательного ввода данных
import {Scenes} from 'telegraf'
import {exitScene} from './exitScene.js'


// Создаём сцену для последовательного ввода данных
const dataWizard = new Scenes.WizardScene(
	'dataWizard',
	async (ctx) => {
		ctx.scene.state.userData = {} // Создаём объект для хранения данных
		await ctx.reply('📌 **Шаг 1/6**\n\n✏ Введите **Имя:**', {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [['❌ Отменить']],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === '❌ Отменить') return exitScene(ctx)
		
		ctx.scene.state.userData.name = ctx.message.text
		await ctx.reply('📌 **Шаг 2/6**\n\n✏ Введите **Фамилию:**', {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [['⬅ Назад', '❌ Отменить']],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === '❌ Отменить') return exitScene(ctx)
		if (ctx.message.text === '⬅ Назад') {
			await ctx.reply('📌 **Шаг 1/6**\n\n✏ Введите **Имя:**')
			return ctx.wizard.selectStep(1)
		}
		
		ctx.scene.state.userData.surname = ctx.message.text
		await ctx.reply('📌 **Шаг 3/6**\n\n📞 Введите **номер телефона:**', {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [['⬅ Назад', '❌ Отменить']],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === '❌ Отменить') return exitScene(ctx)
		if (ctx.message.text === '⬅ Назад') {
			await ctx.reply('📌 **Шаг 2/6**\n\n✏ Введите **Фамилию:**')
			return ctx.wizard.selectStep(2)
		}
		
		ctx.scene.state.userData.phone = ctx.message.text
		await ctx.reply('📌 **Шаг 4/6**\n\n💰 Введите **минимальную цену аренды: 💶**', {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [['⬅ Назад', '❌ Отменить']],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === '❌ Отменить') return exitScene(ctx)
		if (ctx.message.text === '⬅ Назад') {
			await ctx.reply('📌 **Шаг 3/6**\n\n📞 Введите **номер телефона:**')
			return ctx.wizard.selectStep(3)
		}
		
		ctx.scene.state.userData.minPrice = ctx.message.text
		await ctx.reply('📌 **Шаг 5/6**\n\n💰 Введите **максимальную цену аренды: 💶**', {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [['⬅ Назад', '❌ Отменить']],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === '❌ Отменить') return exitScene(ctx)
		if (ctx.message.text === '⬅ Назад') {
			await ctx.reply('📌 **Шаг 4/6**\n\n💰 Введите **минимальную цену аренды: 💶**')
			return ctx.wizard.selectStep(4)
		}
		
		ctx.scene.state.userData.maxPrice = ctx.message.text
		await ctx.reply('📌 **Шаг 6/6**\n\n🏠 Введите **количество комнат:**', {
			parse_mode: 'Markdown',
			reply_markup: {
				keyboard: [['⬅ Назад', '❌ Отменить']],
				resize_keyboard: true,
				one_time_keyboard: false
			}
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === '❌ Отменить') return exitScene(ctx)
		if (ctx.message.text === '⬅ Назад') {
			await ctx.reply('📌 **Шаг 5/6**\n\n💰 Введите **максимальную цену аренды: 💶**')
			return ctx.wizard.selectStep(5)
		}
		
		ctx.scene.state.userData.rooms = ctx.message.text
		
		await ctx.reply(
			`╔══════════════════╗\n` +
			`   ✅ *ВАШИ ДАННЫЕ*  \n` +
			`╚══════════════════╝\n\n` +
			`👤 *Имя:* ${ctx.scene.state.userData.name || '❌ Не указано'}\n` +
			`🏷 *Фамилия:* ${ctx.scene.state.userData.surname || '❌ Не указано'}\n` +
			`📞 *Телефон:* ${ctx.scene.state.userData.phone || '❌ Не указано'}\n` +
			`💰 *Мин. цена:* ${ctx.scene.state.userData.minPrice ? ctx.scene.state.userData.minPrice + ' ₽' : '❌ Не указано'}\n` +
			`💰 *Макс. цена:* ${ctx.scene.state.userData.maxPrice ? ctx.scene.state.userData.maxPrice + ' ₽' : '❌ Не указано'}\n` +
			`🏠 *Кол-во комнат:* ${ctx.scene.state.userData.rooms || '❌ Не указано'}\n\n` +
			`📩 *Спасибо! Ваши данные сохранены.*`,
			{
				parse_mode: 'Markdown',
				reply_markup: {
					keyboard: [
						['⬅ Назад', '❌ Отменить'],
						['Подтвердить ✅']
					],
					resize_keyboard: true,
					one_time_keyboard: false
				}
			}
		)
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text === '❌ Отменить') return exitScene(ctx)
		if (ctx.message.text === 'Подтвердить ✅') {
			// ПОДТВЕРЖДАЕМ И ПЕРЕХОДИМ НА СЛЕД ШАГ ЭТО ГЕНЕРАЦИЯ ССЫЛКИ ДЛЯ ОПЛАТЫ
		}
		if (ctx.message.text === '⬅ Назад') {
			await ctx.reply('📌 **Шаг 6/6**\n\n🏠 Введите **количество комнат:**', {
				parse_mode: 'Markdown',
				reply_markup: {
					keyboard: [['⬅ Назад', '❌ Отменить']],
					resize_keyboard: true,
					one_time_keyboard: false
				}
			})
			return ctx.wizard.selectStep(6)
		}
	}
)


export default dataWizard