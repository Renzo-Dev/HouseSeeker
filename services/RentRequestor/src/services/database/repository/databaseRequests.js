// добавление пользователя в БД
async function addUser(User) {
	const knex = require('knex')(require('../../../knexfile').development)
	
	try {
		const [userId] = await knex('users').insert({
			telegram_id: User.telegram_id,
			first_name: User.firstName,    // updated to snake_case
			last_name: User.lastName,      // updated to snake_case
			email: User.email,
			phone: User.phone,
			city: User.city,
			min_price: User.minPrice,      // updated to snake_case
			max_price: User.maxPrice,      // updated to snake_case
			rooms: User.rooms,
			description: User.description
			
		}).returning('id')
		console.log(`User added with ID: ${userId}`)
	} catch (err) {
		console.log('Error inserting user: ', err.message)
	} finally {
		await knex.destroy()
	}
}

// проверка есть ли пользователь в БД
async function checkUserExists(telegram_id) {
	const knex = require('knex')(require('../../../knexfile').development)
	try {
		const userExists = await knex('users').where('telegram_id', telegram_id).first()
		
		return userExists ? true : false
	} catch (err) {
		console.log('Error checking user by telegram_id: ', err.message)
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
	addUser,
	checkUserExists,
	checkSubscribe
}