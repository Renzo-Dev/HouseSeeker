// (async () => {
// 	const {sendApartmentRequest} = require('./services/apartmentService')
// 	let full = false
// 	setInterval(async () => {
// 		if (!full) {
// 			full = true
// 			full = await sendApartmentRequest()
// 		}
// 	}, 15000)
// })()

const {sendApartmentRequest} = require('./services/apartmentService')
sendApartmentRequest()