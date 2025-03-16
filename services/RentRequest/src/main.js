// setInterval(async () => {
// const sendApartmentRequest = require('./services/RentRequestApi')
// await sendApartmentRequest()
// }, 15000)

(async () => {
	const {sendApartmentRequest} = require('./services/apartmentService')
	await sendApartmentRequest()
})()


// setTimeout(async () => {
// 	const getToken = require('./services/getToken')
// 	let token = await getToken()
//
// 	console.log('Token: ', token)
// }, 1000)