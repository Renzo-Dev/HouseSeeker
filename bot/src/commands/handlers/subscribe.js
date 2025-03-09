async function subscribe(ctx) {
	await ctx.scene.enter('subscribeScene')
	// if (await UserService.checkUserExists(ctx.from.id)) {
	// 	делаем проверку на подписку
	// console.log('User exists')
	// } else {
	// 	вызываем меню подписки
	// await ctx.scene.enter('startScene')
// }
}

module.exports = subscribe