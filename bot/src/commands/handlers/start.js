const UserService = require('../../services/UserService')
const axios = require('axios')


async function start(ctx) {
	
	let result = await UserService.checkUserExists(ctx.from.id)
	// делаем есть ли аккаунт и подписка
	if (result.user && result.subscribe === true) {
		await ctx.scene.enter('userManagerScene')
	} else {
		// вызываем меню подписки
		await ctx.scene.enter('startScene')
	}
}


module.exports = start