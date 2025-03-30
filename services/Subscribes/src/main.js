const dotenv = require('dotenv')
dotenv.config({path: '../../../.env'})
const express = require('express')
const {
	getActiveSubscribes,
	checkSubscribe
} = require('./services/database/repository/subscribeRepository')
const db = require('./services/database/db')
const app = express()


db.migrate.latest()
	.then(() => {
		console.log('✅ Миграции успешно применены')
	})
	.catch(err => {
		console.error('❌ Ошибка при миграциях:', err)
		process.exit(1)
	})

// получаем список подписок
app.get('/getActiveSubscribes', async (req, res) => {
	// получаем всех подписчиков из бд
	const subscribes = await getActiveSubscribes()
	res.send(subscribes)
})

app.get('/checkSubscribe', async (req, res) => {
	// получаем teelgram_id из запроса
	const telegram_id = req.query.telegram_id
	console.log(telegram_id)
	// проверяем есть ли пользователь в бд
	const user = await checkSubscribe(telegram_id)
	console.log(user)
	res.send(user)
})

app.listen(5000, () => {
	console.log('🚀 Сервер успешно запущен на порту 5000')
})