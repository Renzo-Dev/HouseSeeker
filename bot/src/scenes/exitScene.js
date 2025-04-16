// Функция выхода из сцены
const Locales = require('../utils/locales')

async function exitScene(ctx) {
	// Отправляем сообщение с текстом и оформлением
	const message = new Locales(ctx.from.language_code).getSection('exit').message
	await ctx.deleteMessage()
	await ctx.reply(message,
		{
			parse_mode: 'Markdown', // Для поддержки Markdown форматирования
			reply_markup: {remove_keyboard: true} // Убираем клавиатуру
		}
	)
	
	// Покидаем сцену
	return ctx.scene.leave();
}


module.exports = exitScene