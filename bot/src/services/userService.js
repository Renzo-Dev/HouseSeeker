const axios = require('axios')

class UserService {
	static async checkUserSub(telegram_id) {
		try {
			console.log('Response ' + telegram_id)
			// const response = await axios.post('http://host.docker.internal:80/api/user/checkExists', {
			const response = await axios.post('http://localhost:7000/', {
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
			// const response = await axios.post('http://host.docker.internal:80/api/user/get', {
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