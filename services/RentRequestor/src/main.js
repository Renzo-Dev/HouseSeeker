// setInterval(async () => {
// 	const sendApartmentRequest = require('./services/RentRequestor')
// 	await sendApartmentRequest()
// }, 15000)
// setInterval(async () => {
//
// },1500)


(async () => {
	const getToken = require('./services/getToken')
	let token = await getToken()
	console.log(token)
// 	// const sendApartmentRequest = require('./services/RentRequestor')
// 	// await sendApartmentRequest()
})()