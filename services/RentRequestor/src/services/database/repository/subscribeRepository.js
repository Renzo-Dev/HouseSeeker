async function addSubscribe(telegram_id) {

}

async function getActiveSubscribes() {
	const knex = require('knex')(require('../../../knexfile').development)
	try {
		const subscribes = await knex('subscribes').where('status', 'active')
		
		if (subscribes) {
			return subscribes
		} else {
			return []
		}
	} catch (err) {
	
	} finally {
		await knex.destroy()
	}
}

async function checkSubscribe(telegram_id) {
	const knex = require('knex')(require('../../../knexfile').development)
	try {
		const user = await knex('users').where('telegram_id', telegram_id).first()
		console.log(user)
		return !!user
	} catch (err) {
		console.log('Error checking user by telegram_id: ', err.message)
	} finally {
		await knex.destroy()
	}
}

module.exports = {
	checkSubscribe,
	getActiveSubscribes
}