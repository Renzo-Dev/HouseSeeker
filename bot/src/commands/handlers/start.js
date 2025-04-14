const UserService = require('../../services/userService')


async function start(ctx) {
	// проверяем есть ли аккаунт и подписка
	let result = await UserService.checkUserSub(ctx.from.id)
	// делаем есть ли аккаунт и подписка
	if (result.user && result.subscribe === true) {
		await ctx.scene.enter('userManagerScene')
	} else {
	// вызываем меню подписки
	await ctx.scene.enter('startScene')
	}
}


module.exports = start