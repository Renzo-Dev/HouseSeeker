// let full = false
//
// setInterval(async () => {
// 	console.clear()
// 	console.log('send request')
// 	const {sendApartmentRequest} = require('./services/apartmentService')
// 	await sendApartmentRequest()
// }, 300000)

const {sendApartmentRequest} = require('./services/apartmentService')

let full = false
setInterval(async () => {
	if (!full) {
		full = true
		full = await sendApartmentRequest()
	}
}, 15000)