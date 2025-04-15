async function getUserByTgId(telegram_id) {

}

async function getUserByUserId(user_id) {
	const axios = require('axios')
	return await axios.get(`http://nginx/api/users/id/${user_id}`)
		.then(res => res.data)
		.catch(err => {
			console.error('Error fetching user by user_id:', err)
			return null
		})
}

module.exports = {
	getUserByTgId,
	getUserByUserId
}