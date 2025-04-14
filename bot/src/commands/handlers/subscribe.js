// const UserService = require('../../services/userService')

async function subscribe(ctx) {
	// let result = await UserService.checkUserExists(ctx.from.id)
	// console.log(result)
	// делаем есть ли аккаунт и подписка
	// if (result.user && result.subscribe === true) {
	// 	await ctx.scene.enter('userManagerScene')
	// } else {
	// 	вызываем меню подписки
	await ctx.scene.enter('subscribeScene')
	// }
}

module.exports = subscribe