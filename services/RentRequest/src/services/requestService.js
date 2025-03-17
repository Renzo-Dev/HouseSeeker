const {addSentRequest} = require('./database/repository/sent_requestsRepository')
const getToken = require('./authService')
const axios = require('axios')

async function sendRequest(user, apartment) {
	const axios = require('axios')
	let SERVICE_URL = 'https://www.meinestadt.de/_re-service/contact'
	// Генерируем уникальный токен для текущего запроса
	let captchaToken
	try {
		captchaToken = await getToken() // Получаем индивидуальный токен
		// console.log(captchaToken)
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
			await addSentRequest(user.id, apartment.exposeeId, apartment.exposeeId)
		})
		
	} catch (error) {
		if (error.status === 500) {
			let url = `https://immobilien.meinestadt.de/expose/${apartment.exposeeId}/kontaktanfrage?endlink=1`
			// console.log(formatToUUID(apartment.guid))
			// console.log(user)
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
					// 'Content-Type': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					// 'Cookie': '__Secure-3PSID=g.a000ugg8m7VGwXZ6xfYaCj5gVbUKHgFES8o_LOPsPuRNHV3DoNK2613nuNqHSRf_gqd3Ik6B-wACgYKAakSARMSFQHGX2MiRd0W_zl5dEsxwpI0qzC6NBoVAUF8yKoA24pa7ahNNRBkk1k5z0cO0076; __Secure-3PAPISID=I816GiKDaKO7w_VV/A7mSZEysM2bMoj2pC; NID=522=F548f6B9y1v2xV1beo27PsvbYFAJjNZAfN24exauql5tz0B5SERdc4GtyUuUWNkmv54i3G7O_PcAl_k4q1I541MFKJgdP_l8ljEP1o9dq1JisZCBQjyiaNvTRWvJJGPogVrWkJnSUTkZCSanVxC388PE17PVyOWwC9nfMEBZfom8iIRIUwc_1hVFhzTbMWlKxQ5ECb-bV7t1nhBis0VcpNNVuT-xJhurhZTv5sCVU8OPVx1fmiM3TV11aWhTz5HiDwhvmsXGgq7t9lRwmLGXG77Dp1t31TejMMuVLMJqtgRmeHpgsZWpcyL2KlnlE1H6EgdJPegociaypG77O-0iYgPQTIgWaXQTF6lLuqmi2M_re8HNLOrHggUMiXbuvlGEyLRR7wSd8cICqItnfQHvDopntiBqJ_14_QAVFyGJIKY_Alinau1RY4APrResb62b5JebpEtFw8dK0zesj_2_Qome6VSSkXj62GnZojW29SdqIz0FpS-JCN6xT5sg7AvxBei5da6wunRX4iK1MJ5KIBytJKwYTyvD6R6HnRHtUCCdNBF5UUcoslNFkrj_7S5ePiDmH-JBEkANQwF5oFhF3cuaznXCmIWGqvaTrush5CwV2v85tpcV3DlC2MXB8N0OoCnVjt1pWpRY1wr645pI5bGpML1eQpdXTSgaqxclS4CABP2kAiUMFd-koYhtbUCDojR9BkhKdLPcSZPXMGeVWA-OwESX6hi_AXHzDb7JJsXFK4Hq-fb4LciZrrtK9XTgV7tuFKTDApPCa27ONxCOo76zyd_T5vWfQXVqPkVsUuymk_Hcx2b6axp20FFe8MQESYU7LX6Z2dllt4K_zsyl1nrC51iOCDpMYXMJ4hGMzq7htfQTa2qXptRUrhoR0M0cSicNOO_rikqePdrpstLusyAE2kXA_2vtM3UsMCuaSDeqa7HINqdDAyz3ZQkjbyZJbgYU1xte8F_c3laIgSnBK_UPACROWFmd2T98cH8jfFZXqDyFdWPpI6Rh6qhXuDPRAdf2vrtlxPhApWJhqi8C1vWP720CSAuwlMAXvu5BwEAgj-57OoNvXsb_07v4RZP1GfmU3HM2i7pfHXS6ukY0wBbZAus-hoHaXT6ke0saIdSU18Yb0FzGgdgN7WyTD9Kqgmgun5q-LmqD-Ufc0h7mmpLGg6bP9vWZj3xsFzUfGcgzppQtK1opbdtw46w-9FuJHTYc8WdzqO8G2Uo1L6UATqr1Xjfn7Wk0ruFJB4xo6VV7zwLOL5GNAfIHrOdjR5kAIEwmG1nbTUqmbjeEMrDT9THbuTIY4Zetw9olblITCapH0cfV3bWDtfAnhibXcRFAmTh_Icmu5pQZDpnNoszrcJcYAmCETshlH_Jlfm_Tde5uYmy-KHwnVECsEEB9xtVC3j1mr5coABvlmaz_iE29QfVXuvX5JGzISJZInusEfRrj_ygHONI4ZoEDd97ByK5O9wYF41zRlwXFYYw5E56Rgo5tVRELCC8z51s5_9LMf8RKd2D5LLriHAIx7zRLaTlp_nhBLyrrbXcr-P5TEIm0kzM8tE_d0kJWD8_jau4MXxPx2bZ-6AAVourxKclOgNoJrvPWzKhY-_67odMW9ykDSr9TUgcDNdMA7q-6h6kxa-c7avq1gv_uf-PSjsAF_qytl9FIQZ4ruZ1EJQie99SAZDRLIHgK4M8otQzSpnllo28_1PTnmuzCEVXpHNZxCKi-uQGcD7pO9UAV44cfrHUwahKKFFvWYPBPbeER3n1T_I2kgjhvSFJuL1I; __Secure-3PSIDTS=sidts-CjEBEJ3XV3mIvW072BDgOTImIRDt8a8m1Ud16DQ46bJEh0fM493ji4Ije4EbsgcpxQOTEAA; __Secure-3PSIDCC=AKEyXzWWrfqE7tYT838tNp_NMU3PjKuvTwOLlmeQcwezW7KNU3KaBXTU98ZgwBQCw_y_F7jdaz0'
					'Cookie': 'IWDeviceType=3; _hjHasCachedUserAttributes=true; MS_JOBS_USERREQ_UUID="3280357d-69e5-4e25-aa64-2412f5be4f53"; AMCVS_24D022CE527854F10A490D4D%40AdobeOrg=1; s_cc=true; _sp_su=false; c_te=1; c_tea=,aa,bio,g,li,pi,sv,so,td,rtb,cl,fb,ba,tt,; consentUUID=be2c056d-e212-485f-8660-9f2f3e5dfd5c_42; consentDate=2025-03-16T22:07:35.763Z; cmp_ms_p=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11; bx=6d9247133d684995ac9397e46df7a298; IwAGSessionId=42a6d389-509a-d62b-1d99-e9a20e364990; wd=dfc3d7ef44ec4eca9ca7568a33e3a1a3; xy=dfc3d7ef44ec4eca9ca7568a33e3a1a3; bm_mi=7E98930331ABEDCF22EBAA773C574D5A~YAAQiGZWuHAftqOVAQAAk0KIpRsTXvxg6oh88bUD9Wg3tw7tWj34DJpbOB/MtnXJbw/njM99jxlVVITJy/324/V7S2sxXRYXgFywlGExMkE6ZfahSj2WAFHpllqEMACPQJh4veofPT38D0hNIRgV7xE57m6eNS4xKcil7dLVfclyXogRLBkBMeoZgKrGDwIDOQPcHKuVz9C0om+IrRQXR4eJvMwJwXIQWzcKB2FHP8WGz/vx8rWv8zx0N9cY2DjIsSEL7Us1spxdts+0q7J0uMEicpfOK6x+pM0g1OBzks2jsYyJ6rFIT2PGfcWbpy52x8rQDDqQCmaUxI6rqA==~1; bm_sv=3E84320A77087A198603E5A3CEEB52FC~YAAQiGZWuHEftqOVAQAAk0KIpRuhKeM2a+4YMdbCi/VepwXVVWMNuUVD7bCQy5quvSSDtDIJmCePMhQoonOWolnG7coIfJCIx8g+YE6lP2Kz6ULlpP1U6YoDpDhr4uoBcI5ukz1GUlTX5iLjES2jDFCwNubk7jy565WsPkD7y3/1rEeEtSrKj2WRL/Dueg4m7thF3AA+0uJG1dO7cuvO3Ljw5l9Pu0sna53ch3Hq0jUzT6FVEHBSRi0ziiFpY8fyNQgZ~1; ak_bmsc=68F0021EC3018D690641E6724C2A5A4B~000000000000000000000000000000~YAAQiGZWuKJFtqOVAQAAcJqIpRtd/jzC3twu2yxs9TUP0iRfD1HSFpzIws3Ccu30ddZw4lvrmFhiCRR7fmrAQuUsziqvsrKCfxYkrA0I4Q5rn8JHPVetZqNBIDjpVnc/os7oeSyzyoospp/6pzz76UsleRouSskTkcHWXVSoO8nb9UmVJkAiRfzdGIqmEyBD/bPYm7jn9gpet838TcE05R30YqgiIpXbQB5C8owj9Sz9cZctJ6Hm/PxaygwPxawTkqcDNuzyYGgx7Ew1rEeCFn9sBs/jMMXrEXM8X6v78d2cE15rYcosSGEnUwklUeAjF9T4r8cGw16pA/+Vffvyw+AWgqv7sgP0xZmYtWLJOhvxry/m744yQTtOmtsX3/sAGD6yzx5F8MLFVZpXVm5ksUkFDmgym/ekNWhVa4iGllq6RWBHMhF2xCFkw+brZ9b/Kw==; MS_JOBS_ABTEST_VARIANTS="eyJhYnRlc3RzIjpbeyJpZCI6IkVDLTEyMDAzLTEiLCJ2YXJpYW50IjoiQiJ9XSwidmVyc2lvbiI6Mn0="; meinestadt="koeln"; s_sq=%5B%5BB%5D%5D; AMCV_24D022CE527854F10A490D4D%40AdobeOrg=-1124106680%7CMCIDTS%7C20165%7CMCMID%7C41441849371494397052549983309530771185%7CMCOPTOUT-1742247728s%7CNONE%7CvVersion%7C5.2.0%7CMCAID%7CNONE%7CMCAAMLH-1742579157%7C6%7CMCAAMB-1742207582%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI; iwlastobjects=c0=ZYj8rNTXmsc0qSMdJF+Py7p1ViM0wyNWqApytFnSlN7IopQ4yhk9VFCmWsP6hzaa477adVJSPgWn+EW9QUNcxAsGpyjnefueh913zQvx37230QbQexCERUsTkuYNpp99&c1=ZYj8rNTXmsc0qSMdJF+Py+KR2NOSZMQchTJeucGJ2LWtTwm1e7/wKhWpHPIkl52HOemjOyRqmhIHzDt8uMX6wxFezh6sajsSGjeNOIyBL5H2hzBiKc2hlYPUexSHUN4D&c2=ZYj8rNTXmsc0qSMdJF+Pyz4SDiS+z1SE3zNINFqNPbx9SIhadN+yE3nVXO97dYtU7whZPuiZfH842MlkN8w0WFLH3VYzBZrFDtZvWVKe90CYsikZSJflOAOu19oFGufr&c3=ZYj8rNTXmsc0qSMdJF+Py4rt5f0H7L5wlNEsZSGsQPLDggrgfF/AI3r9z7Us8WfcDr8OOMN38O55dOPX2qHCvI0t+lJxD1O9gUoq1ooznv3piQihHiwT3/nvK/smItxI&c4=ZYj8rNTXmsc0qSMdJF+Py8ahNJk6cxMrqwcbaEl54OYF8asIxXwgXqbjQl00BM2K95WPO0mn/kqH0qK+gZw+cdHxINdRRILuvSg9Ae02nxZWu/4Kuu85Brbs7IJWzEjg&c5=ZYj8rNTXmsc0qSMdJF+Pyy2c+6DaFddPbmhOtnQ/zHSnk98Q/80XXKfdVK0G1A91kSr3vpWFAugI5frttrmYdbQFQ+KRK67W5IDeh8S+S2wYrzeT1cxW24+dSdPh50yq&c6=ZYj8rNTXmsc0qSMdJF+Pyy1InB4djdq2S2mOFlUNg7pse0oEWbL+yxI7gQ5rUi2hdzd9kZJqVqb3rDUtHjuAthfFANRt9GPAbvZnCfG8neiNAgJmA5DWX+2DjCuIu13R; utag_main=v_id:0195862c4b3c000bfdf8aaf3272f0506f001a06700bd0$_sn:20$_se:40$_ss:0$_st:1742242683132$vapi_domain:meinestadt.de$ses_id:1742238765951%3Bexp-session$_pn:24%3Bexp-session; iwScreenRes=964,4981'
				}
			}).then(async (response) => {
				console.log(`Заявка успешно отправлена: ${response.status}, ID: ${apartment.exposeeId}`)
				// Сохраняем заявку в базе данных
				await addSentRequest(user.id, apartment.exposeeId, apartment.exposeeId)
			}).catch(error => {
				console.error(`Ошибка отправки заявки для объекта N2 ${apartment.exposeeId}:`, error.message)
			})
		}
		console.error(`Ошибка отправки заявки для объекта ${apartment.exposeeId}:`, error.message)
		// // Логируем ошибку, но продолжаем обработку других заявок
		
		
		//
		//  ПЕРЕПИСАТЬ ЛОГИКУ CATCH
		//
	}
}

function formatToUUID(hexString) {
	return hexString.replace(
		/^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
		'$1-$2-$3-$4-$5'
	)
}

// async function sendRequest(token, user, exposeeId) {
// 	const axios = require('axios')
// 	try {
// 		let SERVICE_URL = 'https://www.meinestadt.de/_re-service/contact'
// 		// ДОДЕЛАТЬ БОТА
// 		// console.log(token)
// 		// let formData = {
// 		// 	email: user.email,
// 		// 	salutation: 'm',
// 		// 	firstname: user.first_name,
// 		// 	lastname: user.last_name,
// 		// 	message: user.description,
// 		// 	captchaToken: token,
// 		// 	phone: user.phone
// 		// }
//
// 		console.log(token)
// 		let formData = {
// 			email: 'kovelenkodima@gmail.com',
// 			salutation: 'm',
// 			firstname: 'Dan',
// 			lastname: 'Koshevoy',
// 			message: 'Guten Tag, mich interessiert dieses Angebot.',
// 			captchaToken: token,
// 			phone: '4915204395231'
// 		}
//
// 		// console.log(formData)
// 		// console.log(exposeeId)
// 		//
// 		await axios.post(SERVICE_URL, {
// 				...formData,
// 				realEstateId: exposeeId
// 			}, {
// 				headers: {
// 					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
// 					'Accept': 'application/json',
// 					'Content-Type': 'application/json',
// 					// 'Cookie': cookie
// 					// 'Cookie': '__Secure-3PSID=g.a000uwg8m0LJKscs1zw3Hv8FQLs2BEKCkBp_Is9LY8xMwZsJOHnxVD6xmIeqoGZXwbDkqRbzYgACgYKAUsSARMSFQHGX2MiYtaVdNaSoMfsXzj-6lGFrhoVAUF8yKpBnHuCa9U-NktxBHV8hY5C0076; __Secure-3PAPISID=zKAq0PqdNYhUH3y-/A11zUMZUkYRPhDSnm; NID=522=2o4BoSIdn_cAOX-yhdHnm9ARlTLIom5IZFQVE_UPrFwRTrz4LyGiyubwVlEbZivbbuCh1zkcoU6_LfkI_oL3BN6stXHJ9r2Jm61aRtxPgMKlsaIKIjYJXUfTOlXvvTZmNM9ACIIUJAw1IBFJ0USgnBisT0ZXVtJeV9YPrGkFUD9uoojZKuPLvPgQa_ovYlcFmrvuxy525Y2LvMopMsBVPn_jTciJY1N0JOjLDdqzyFJR2qLG5u6fO9v21M34CK2JWajY3KaFjou-FewIgvMnyBvZca87-cank8SPrR6Zr7GBa1vD103zofXttZlvXx43KHPhUPMDROMGpDmjByYiGROu77su6yOxGz-BOVGwBfYAmrXr9sfcPL5-NxnkCZH2RluBo2_8nJWH9hK1o72EI_egO9mslAO1EmtrX6baNkWWfuYgkwlZuIIgPz-ov0UyZGiRTU3C_g; __Secure-3PSIDTS=sidts-CjEB7pHptd7xPRzZtmIsVCDgNO_I5eopqwgO6MNzfZHA8E4acsXa4QiJA_IKYry1PtJpEAA; __Secure-3PSIDCC=AKEyXzWlZF-yPdH7dbbt2eB2pYplFkPySohEdB35YyJdV9QA87rSVnFZlxQ8xSt9P8V5OfZl_j0'
// 					// 'Cookie': '__Secure-3PSID=g.a000uwg8m0LJKscs1zw3Hv8FQLs2BEKCkBp_Is9LY8xMwZsJOHnxVD6xmIeqoGZXwbDkqRbzYgACgYKAUsSARMSFQHGX2MiYtaVdNaSoMfsXzj-6lGFrhoVAUF8yKpBnHuCa9U-NktxBHV8hY5C0076; __Secure-3PAPISID=zKAq0PqdNYhUH3y-/A11zUMZUkYRPhDSnm; NID=522=2o4BoSIdn_cAOX-yhdHnm9ARlTLIom5IZFQVE_UPrFwRTrz4LyGiyubwVlEbZivbbuCh1zkcoU6_LfkI_oL3BN6stXHJ9r2Jm61aRtxPgMKlsaIKIjYJXUfTOlXvvTZmNM9ACIIUJAw1IBFJ0USgnBisT0ZXVtJeV9YPrGkFUD9uoojZKuPLvPgQa_ovYlcFmrvuxy525Y2LvMopMsBVPn_jTciJY1N0JOjLDdqzyFJR2qLG5u6fO9v21M34CK2JWajY3KaFjou-FewIgvMnyBvZca87-cank8SPrR6Zr7GBa1vD103zofXttZlvXx43KHPhUPMDROMGpDmjByYiGROu77su6yOxGz-BOVGwBfYAmrXr9sfcPL5-NxnkCZH2RluBo2_8nJWH9hK1o72EI_egO9mslAO1EmtrX6baNkWWfuYgkwlZuIIgPz-ov0UyZGiRTU3C_g; __Secure-3PSIDTS=sidts-CjEB7pHptd7xPRzZtmIsVCDgNO_I5eopqwgO6MNzfZHA8E4acsXa4QiJA_IKYry1PtJpEAA; __Secure-3PSIDCC=AKEyXzVM1nBm_f04KvoKS8floJjQdDlHiIIje0JoLtM08V-tB-MWTzTE-LhlhXZlaDTVQJAtH8M'
// 				}
// 			}
// 		).then(response => {
// 			console.log(response.status, response.data)
// 		})
// 		console.log('Заявка отправлена')
// 		return true
// 	} catch (error) {
// 		console.error('Ошибка:', error.message)
// 		return false
// 	}
// }

module.exports = sendRequest