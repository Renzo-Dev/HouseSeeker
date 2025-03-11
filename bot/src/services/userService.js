const axios = require('axios')

class UserService {
	static async checkUserExists(telegram_id) {
		try {
			console.log('Response ' + telegram_id)
			const response = await axios.post('http://host.docker.internal:80/api/user/checkExists', {
				telegram_id: telegram_id
			})
			return response.data
		} catch (error) {
			console.error('Ошибка при проверке пользователя:', error)
			return false // В случае ошибки считаем, что пользователя нет
		}
	}
	
	static async getUserDetails(telegram_id) {
		try {
			const response = await axios.post('http://host.docker.internal:80/api/user/get', {
				telegram_id: telegram_id
			})
			return response.data
		} catch (error) {
			console.error('Ошибка при проверке пользователя:', error)
			return false // В случае ошибки считаем, что пользователя нет
		}
	}
}

module.exports = UserService