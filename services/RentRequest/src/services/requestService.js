const {addSentRequest} = require('./database/repository/sent_requestsRepository')
const {getToken} = require('./authService')

async function sendRequest(user, apartment, location, cookie) {
	const axios = require('axios')
	let SERVICE_URL = 'https://www.meinestadt.de/_re-service/contact'
	// Генерируем уникальный токен для текущего запроса
	let captchaToken
	try {
		captchaToken = await getToken() // Получаем индивидуальный токен
	} catch (error) {
		console.error(`Ошибка получения токена для объекта ${apartment.exposeeId}:`, error.message)
		return
	}
	
	let formData = {
		email: user.email,
		salutation: 'm',
		firstname: user.first_name,
		lastname: user.last_name,
		message: user.description,
		captchaToken: captchaToken,
		phone: '4915204395310'
	}
	try {
		// отправляем запрос
		await axios.post(SERVICE_URL, {
				...formData,
				realEstateId: apartment.exposeeId
			}, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Cookie': '__Secure-3PSID=g.a000ugg8m7VGwXZ6xfYaCj5gVbUKHgFES8o_LOPsPuRNHV3DoNK2613nuNqHSRf_gqd3Ik6B-wACgYKAakSARMSFQHGX2MiRd0W_zl5dEsxwpI0qzC6NBoVAUF8yKoA24pa7ahNNRBkk1k5z0cO0076; __Secure-3PAPISID=I816GiKDaKO7w_VV/A7mSZEysM2bMoj2pC; NID=522=F548f6B9y1v2xV1beo27PsvbYFAJjNZAfN24exauql5tz0B5SERdc4GtyUuUWNkmv54i3G7O_PcAl_k4q1I541MFKJgdP_l8ljEP1o9dq1JisZCBQjyiaNvTRWvJJGPogVrWkJnSUTkZCSanVxC388PE17PVyOWwC9nfMEBZfom8iIRIUwc_1hVFhzTbMWlKxQ5ECb-bV7t1nhBis0VcpNNVuT-xJhurhZTv5sCVU8OPVx1fmiM3TV11aWhTz5HiDwhvmsXGgq7t9lRwmLGXG77Dp1t31TejMMuVLMJqtgRmeHpgsZWpcyL2KlnlE1H6EgdJPegociaypG77O-0iYgPQTIgWaXQTF6lLuqmi2M_re8HNLOrHggUMiXbuvlGEyLRR7wSd8cICqItnfQHvDopntiBqJ_14_QAVFyGJIKY_Alinau1RY4APrResb62b5JebpEtFw8dK0zesj_2_Qome6VSSkXj62GnZojW29SdqIz0FpS-JCN6xT5sg7AvxBei5da6wunRX4iK1MJ5KIBytJKwYTyvD6R6HnRHtUCCdNBF5UUcoslNFkrj_7S5ePiDmH-JBEkANQwF5oFhF3cuaznXCmIWGqvaTrush5CwV2v85tpcV3DlC2MXB8N0OoCnVjt1pWpRY1wr645pI5bGpML1eQpdXTSgaqxclS4CABP2kAiUMFd-koYhtbUCDojR9BkhKdLPcSZPXMGeVWA-OwESX6hi_AXHzDb7JJsXFK4Hq-fb4LciZrrtK9XTgV7tuFKTDApPCa27ONxCOo76zyd_T5vWfQXVqPkVsUuymk_Hcx2b6axp20FFe8MQESYU7LX6Z2dllt4K_zsyl1nrC51iOCDpMYXMJ4hGMzq7htfQTa2qXptRUrhoR0M0cSicNOO_rikqePdrpstLusyAE2kXA_2vtM3UsMCuaSDeqa7HINqdDAyz3ZQkjbyZJbgYU1xte8F_c3laIgSnBK_UPACROWFmd2T98cH8jfFZXqDyFdWPpI6Rh6qhXuDPRAdf2vrtlxPhApWJhqi8C1vWP720CSAuwlMAXvu5BwEAgj-57OoNvXsb_07v4RZP1GfmU3HM2i7pfHXS6ukY0wBbZAus-hoHaXT6ke0saIdSU18Yb0FzGgdgN7WyTD9Kqgmgun5q-LmqD-Ufc0h7mmpLGg6bP9vWZj3xsFzUfGcgzppQtK1opbdtw46w-9FuJHTYc8WdzqO8G2Uo1L6UATqr1Xjfn7Wk0ruFJB4xo6VV7zwLOL5GNAfIHrOdjR5kAIEwmG1nbTUqmbjeEMrDT9THbuTIY4Zetw9olblITCapH0cfV3bWDtfAnhibXcRFAmTh_Icmu5pQZDpnNoszrcJcYAmCETshlH_Jlfm_Tde5uYmy-KHwnVECsEEB9xtVC3j1mr5coABvlmaz_iE29QfVXuvX5JGzISJZInusEfRrj_ygHONI4ZoEDd97ByK5O9wYF41zRlwXFYYw5E56Rgo5tVRELCC8z51s5_9LMf8RKd2D5LLriHAIx7zRLaTlp_nhBLyrrbXcr-P5TEIm0kzM8tE_d0kJWD8_jau4MXxPx2bZ-6AAVourxKclOgNoJrvPWzKhY-_67odMW9ykDSr9TUgcDNdMA7q-6h6kxa-c7avq1gv_uf-PSjsAF_qytl9FIQZ4ruZ1EJQie99SAZDRLIHgK4M8otQzSpnllo28_1PTnmuzCEVXpHNZxCKi-uQGcD7pO9UAV44cfrHUwahKKFFvWYPBPbeER3n1T_I2kgjhvSFJuL1I; __Secure-3PSIDTS=sidts-CjEBEJ3XV3mIvW072BDgOTImIRDt8a8m1Ud16DQ46bJEh0fM493ji4Ije4EbsgcpxQOTEAA; __Secure-3PSIDCC=AKEyXzWWrfqE7tYT838tNp_NMU3PjKuvTwOLlmeQcwezW7KNU3KaBXTU98ZgwBQCw_y_F7jdaz0'
				}
			}
		).then(async (response) => {
			console.log(`Заявка успешно отправлена: ${response.status}, ID: ${apartment.exposeeId}`)
			// Сохраняем заявку в базе данных
			await addSentRequest(user.id, apartment.exposeeId, apartment.detailUrl)
		})
		
	} catch (error) {
		if (error.status === 500) {
			let url = `https://immobilien.meinestadt.de/expose/${apartment.exposeeId}/kontaktanfrage?endlink=1`
			let data = {
				EstateGuid: apartment.guid,
				EstateId: apartment.exposeeId,
				Address: {
					GlobalUserId: 3144263
				},
				EstateGlobalObjectKey: formatToUUID(apartment.guid),
				ValidatationForEmail: '',
				objectVal: 'tbJlOEAcGg4C2NZv19P1ZhSx6mF+AcrLGz0PZNXMnNkSDVfBXeB93SWyKZOtMwPfRWDlDcVRG+9FDKisMmCJje+0gP4lvrVfuGA2Bm8kvQA=',
				ContactPersonName: '',
				GlobalObjectKey: formatToUUID(apartment.guid),
				OffererGlobalUserId: 3144263,
				UserGlobalUserId: 0,
				InputElement: {
					salutation: 'Herr',
					firstname: user.first_name,
					lastname: user.last_name,
					firmname: '',
					contactPerson: '',
					email: user.email,
					tel: user.phone,
					street: 'dontostr',
					zipcode: 'dontostr',
					city: user.city,
					message: user.description,
					requestViewing: true
				}
			}
			// отправляем запрос
			await axios.post(url, {
				...data
			}, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Cookie': cookie
				}
			}).then(async (response) => {
				console.log(`Заявка успешно отправлена: ${response.status}, ID: ${apartment.exposeeId}`)
				// Сохраняем заявку в базе данных
				await addSentRequest(user.id, apartment.exposeeId, apartment.detailUrl)
			}).catch(error => {
				console.error(`Ошибка отправки заявки для объекта N2 ${apartment.exposeeId}:`, error.message)
			})
		} else {
			console.error(`Ошибка отправки заявки для объекта ${apartment.exposeeId}:`, error.message)
			// // Логируем ошибку, но продолжаем обработку других заявок
		}
	}
}

function formatToUUID(hexString) {
	return hexString.replace(
		/^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
		'$1-$2-$3-$4-$5'
	)
}


module.exports = sendRequest