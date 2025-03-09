const axios = require('axios')

class UserService {
	static async checkUserExists(telegram_id) {
		try {
			const response = await axios.post('http://host.docker.internal:80/api/checkUser', {
				telegram_id: telegram_id
			})
			return !!response.data.exists
		} catch (error) {
			console.error('Ошибка при проверке пользователя:', error)
			return false // В случае ошибки считаем, что пользователя нет
		}
		
		
		let url = 'http://host.docker.internal:80/api/checkUser'
		axios.post(url, {
			telegram_id: telegram_id
		}).then(response => {
				return !!response.data.success
			}
		).catch(error => {
			console.error('Ошибка:', error) // Обработка ошибок
		})
		
		
		// fetch('http://host.docker.internal:80/api/checkUser', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		telegram_id: ctx.from.id,
		// 	})
		// }).then(res => {
		// 	if (res.status === 200) {
		// 		return res.json(); // Получаем тело ответа как JSON
		// 	}
		// }).then(data => {
		//
		// 	console.log(data); // Здесь вы получите ваш объект JSON
		// }).catch(err => {
		// 	console.error('Ошибка:', err); // Добавляем обработку ошибок
		// });
	}
}

module
	.exports = UserService