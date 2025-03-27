const express = require('express')
const {getActiveSubscribes, checkSubscribe} = require('./services/database/repository/subscribeRepository')
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
	// получаем всех подписчиков из бд
	const user = await checkSubscribe()
	res.send(user)
})

app.listen(7000, () => {
	console.log('🚀 Сервер успешно запущен на порту 7000')
})