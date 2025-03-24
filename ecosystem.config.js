module.exports = {
	apps: [
		{
			name: 'telegram-bot',
			script: './bot/src/main.js',
			env: {
				PORT: 3000
			}
		},
		{
			name: 'freekassa-listener',
			script: './services/Payment/src/payment.js',
			env: {
				PORT: 5000
			}
		},
		{
			name: 'rent-request-service',
			script: './services/RentRequest/src/main.js',
			env: {}
		}
	]
}
