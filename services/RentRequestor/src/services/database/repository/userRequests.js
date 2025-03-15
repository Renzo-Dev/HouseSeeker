/**
 * Adds a new user to the 'users' table in the database.
 *
 * @param {Object} User - Object containing user details.
 * @param {number} User.telegram_id - User's Telegram ID.
 * @param {string} User.firstName - User's first name.
 * @param {string} User.lastName - User's last name.
 * @param {string} User.email - User's email address.
 * @param {string} User.phone - User's phone number.
 * @param {string} User.city - User's city.
 * @param {number} User.minPrice - Minimum price the user is interested in.
 * @param {number} User.maxPrice - Maximum price the user is interested in.
 * @param {number} User.rooms - Number of rooms the user prefers.
 * @param {string} User.description - Additional description or notes about the user.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user is successfully added, or false if an error occurs.
 * Ensures proper cleanup of the database connection.
 */
async function addUser(User) {
	const knex = require('knex')(require('../../../knexfile').development)
	
	try {
		// Check if the user already exists
		if (await checkUserExists(User.telegram_id)) {
			return false
		}
		
		// Insert user data into the 'users' table and retrieve the generated ID
		const [userId] = await knex('users').insert({
			telegram_id: User.telegram_id,
			first_name: User.firstName,		// updated to snake_case
			last_name: User.lastName,			// updated to snake_case
			email: User.email,
			phone: User.phone,
			city: User.city,
			min_price: User.minPrice,			// updated to snake_case
			max_price: User.maxPrice,			// updated to snake_case
			rooms: User.rooms,
			description: User.description
		}).returning('id')
		
		// Log the ID of the newly added user
		console.log(`User added with ID: ${userId}`)
		return true
	} catch (err) {
		// Log the error message in case of an error during insertion
		console.log('Error inserting user: ', err.message)
		return false
	} finally {
		// Ensure the database connection is destroyed to avoid resource leaks
		await knex.destroy()
	}
}

/**
 * Checks if a user exists in the database by their Telegram ID.
 *
 * @param {number} telegram_id - The Telegram ID of the user to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, or false if not.
 * Handles errors and ensures proper cleanup of the database connection.
 */
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


/**
 * Retrieves a user from the database by their Telegram ID.
 *
 * @param {number} telegram_id - The Telegram ID of the user to retrieve.
 * @returns {Promise<Object|boolean>} - A promise that resolves to the user object if found,
 * or false if no user exists with the given Telegram ID.
 */
async function getUserByTgId(telegram_id) {
	const knex = require('knex')(require('../../../knexfile').development)
	try {
		const user = await knex('users').where('telegram_id', telegram_id).first()
		if (user) {
			return user
		} else {
			return false
		}
	} catch (err) {
		console.log('Error checking user by telegram_id: ', err.message)
	}
}

/**
 * Retrieves a user from the database by their Telegram ID.
 *
 * @param {number} user_id - The user ID of the user to retrieve.
 * @returns {Promise<Object|boolean>} - A promise that resolves to the user object if found,
 * or false if no user exists with the given Telegram ID.
 */
async function getUserByUserId(user_id) {
	const knex = require('knex')(require('../../../knexfile').development)
	try {
		const user = await knex('users').where('id', user_id).first()
		if (user) {
			return user
		} else {
			return false
		}
	} catch (err) {
		console.log('Error checking user by telegram_id: ', err.message)
	}
}

module.exports = {
	addUser,
	checkUserExists,
	getUserByTgId,
	getUserByUserId,
}