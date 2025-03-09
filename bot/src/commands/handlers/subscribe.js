const {checkUserExists} = require('../../services/userService')

async function subscribe(ctx) {
	if (await checkUserExists(ctx.from.id)) {
		// вызываем управление подпиской
		await ctx.reply('УПРАВЛЕНИЕ ПОДПСИКОЙ')
	} else {
		// вызываем меню подписки
		await ctx.scene.enter('subscribeScene')
	}
	// await ctx.scene.enter('subscribeScene')
}

module.exports = subscribe