// Retrieves all sent requests associated with a specific user ID.
async function getAllSentRequests(user_id) {
	const knex = require('knex')(require('../../../knexfile').development)
	// return knex('sent_requests').where('user_id', user_id).select('house_id')
	return knex('sent_requests').where('user_id', user_id) || []
}

async function addSentRequest(user_id, house_id, link) {
	const knex = require('knex')(require('../../../knexfile').development)
	try {
		await knex('sent_requests').insert({
			user_id,
			house_id,
			link
		})
		return true
	} catch (error) {
		console.error('Error adding sent request:', error)
		throw error
	}
}

module.exports = {
	getAllSentRequests,
	addSentRequest
}