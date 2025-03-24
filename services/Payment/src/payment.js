const express = require('express')
const crypto = require('crypto')
const axios = require('axios')

const app = express()
app.use(express.urlencoded({extended: true})) // Поддержка данных в формате application/x-www-form-urlencoded

// Твои секретные слова из FreeKassa
const SECRET_WORD_1 = '3N8S5M0W51}a3B?'
const SECRET_WORD_2 = 'F[StgfjD_LBi0,5'

// Telegram Bot API
const TELEGRAM_BOT_URL = 'http://localhost:3000/notify' // или внешний адрес твоего бота

// Уведомление от FreeKassa
// 📩 Endpoint, куда FreeKassa будет отправлять уведомления об оплате
app.get('/freekassa/notify', async (req, res) => {
	const {
		MERCHANT_ID,     // ID мерчанта
		AMOUNT,          // Сумма оплаты
		intid,           // ID транзакции
		P_EMAIL,         // Email пользователя (может быть пустой)
		SIGN,            // Подпись запроса от FreeKassa
		us_telegram_id   // 💬 Переданный нами Telegram ID пользователя
	} = req.query
	
	// ✅ Генерация сигнатуры для проверки подлинности
	const expectedSign = crypto.createHash('md5').update(
		`${MERCHANT_ID}:${AMOUNT}:${SECRET_WORD_2}:${intid}`
	).digest('hex')
	
	// 🔒 Проверка подписи
	if (SIGN !== expectedSign) {
		// ❌ Подпись не совпала — отправляем ошибку в бота (опционально)
		await axios.post(TELEGRAM_BOT_URL, {
			status: 'error',
			reason: 'Неверная подпись',
			query: req.query
		}).catch(() => {
		})
		return res.status(400).send('Bad sign')
	}
	
	// ✅ Подпись совпала — отправляем успешное уведомление в бота
	await axios.post(TELEGRAM_BOT_URL, {
		status: 'success',
		telegram_id: us_telegram_id || null,
		user: P_EMAIL || 'unknown',
		amount: AMOUNT,
		id: intid
	}).catch(() => {
	}) // игнорируем ошибки, чтобы не сломать обработку FreeKassa
	
	// FreeKassa ожидает "YES" как подтверждение получения
	res.send('YES')
})

// ✅ Обработка успешной оплаты (редирект после оплаты)
app.get('/freekassa/success', (req, res) => {
	res.send('Оплата прошла успешно!')
})

// ❌ Обработка отказа в оплате
app.get('/freekassa/fail', async (req, res) => {
	const {us_telegram_id} = req.query
	
	// Отправка уведомления в бота об отказе
	await axios.post(TELEGRAM_BOT_URL, {
		status: 'fail',
		telegram_id: us_telegram_id || null,
		query: req.query
	}).catch(() => {
	})
	
	res.send('Оплата не удалась.')
})

// 🚀 Запуск сервера на 5000 порту
const PORT = 5000
app.listen(PORT, () => {
	console.log(`FreeKassa listener запущен на порту ${PORT}`)
})