// Функция выхода из сцены
export async function exitScene(ctx) {
	// Отправляем сообщение с текстом и оформлением
	await ctx.reply(
		`🔄 Чтобы начать заново, просто введите команду: \n` +
		`➡️ /start — для возврата на главный экран и начала работы с ботом. \n\n` +
		`Спасибо, что использовали наш сервис! 🙌`,
		{
			parse_mode: 'Markdown', // Для поддержки Markdown форматирования
			reply_markup: {remove_keyboard: true} // Убираем клавиатуру
		}
	);
	
	// Покидаем сцену
	return ctx.scene.leave();
}
