const UserService = require('../../services/UserService')

async function start(ctx) {
	if (await UserService.checkUserExists(ctx.from.id)) {
		// делаем проверку на подписку
		console.log('User exists')
	} else {
		
		// вызываем меню подписки
		await ctx.scene.enter('startScene')
	}
}

module.exports = start