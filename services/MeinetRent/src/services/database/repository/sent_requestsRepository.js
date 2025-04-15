// Retrieves all sent requests associated with a specific user ID.
async function getAllSentRequests(user_id) {
	const axios = require('axios')
	try {
		const sents = await axios.get(`http://nginx/api/sent/id/${user_id}`).then(res => res.data)
		if (sents.sent_requests.length === 0) return [] || sents.sent_requests
	} catch (err) {
		console.error('Error fetching sent requests:', err)
	}
}

async function addSentRequest(user_id, house_id, link) {
}

module.exports = {
	getAllSentRequests,
	addSentRequest
}