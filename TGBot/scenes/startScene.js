// Создаем сцену для стартового сообщения
import {Scenes} from 'telegraf'
import {exitScene} from './exitScene.js'

const startScene = new Scenes.WizardScene('startScene',
	async (ctx) => {
		ctx.scene.state.userData = {} // Создаём объект для хранения данных
		await ctx.reply(
			'<b>🏡 Добро пожаловать в House Seeker!</b>\n' +
			'────────────────────────\n' +
			'🔎 Наш сервис поможет вам быстро найти квартиру для аренды и подать заявку всего в несколько шагов!\n\n' +
			
			'<b>📌 Как начать?</b>\n' +
			'1️⃣ Введите команду <code>/subscribe</code> для подписки.\n' +
			'2️⃣ Укажите ваши данные:\n' +
			'   - 👤 <b>Имя и Фамилия</b>\n' +
			'   - 💰 <b>Мин. и макс. цена аренды</b>\n' +
			'   - 🏠 <b>Количество комнат</b>\n' +
			'   - 📞 <b>Номер телефона</b>\n' +
			'   - 📧 <b>Email</b>\n' +
			'3️⃣ Оплатите подписку и получите полный доступ к функционалу.\n\n' +
			
			'✅ После оплаты бот начнёт работу, и вы получите доступ к поиску и заявкам на аренду.\n\n' +
			
			'<b>⚙ Управление ботом:</b>\n' +
			'🔹 <code>/applications</code> — Посмотреть отправленные заявки\n' +
			'🔹 <code>/edit_profile</code> — Изменить введённые данные\n' +
			'🔹 <code>/support</code> — Связаться с поддержкой\n' +
			'🔹 <code>/unsubscribe</code> — Отключить подписку\n\n' +
			
			'📩 <b>Остались вопросы?</b> Свяжитесь с поддержкой через <code>/support</code>\n\n' +
			
			'🔘 Или нажмите <b>Продолжить</b> для подписки.',
			{
				parse_mode: 'HTML',
				reply_markup: {
					keyboard: [['❌ Отменить'], ['Продолжить ➡️']],
					resize_keyboard: true,
					one_time_keyboard: true
				}
			}
		)
		return ctx.wizard.next()

	},
	async (ctx) => {
		if (ctx.message.text === '❌ Отменить') return exitScene(ctx)
		if (ctx.message.text === 'Продолжить ➡️' || ctx.message.text === '/subscribe') {
			await ctx.scene.enter('dataWizard')
		}
	}
)

export default startScene