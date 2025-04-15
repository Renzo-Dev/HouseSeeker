async function getAllSubscribes() {
	const axios = require('axios')
	return await axios.get('http://nginx/api/sub/getActiveSubscribes')
		.then(res => res.data)
		.catch(err => {
			console.error('Error fetching subscribes:', err)
			return []
		})
}

module.exports = {
	getAllSubscribes
}