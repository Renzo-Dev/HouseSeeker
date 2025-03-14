// const axios = require('axios')
// (async () => {
// 	let token = await getToken()
// 	console.log('Token: ', token)
// })()

// let token = await getToken()

async function getToken() {
	const puppeteer = require('puppeteer')
	// запускаем браузер
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	
	// переходим на страницу с recaptcha
	await page.goto('http://localhost:3000')
	// вставляем скрипт с reCaptcha на страницу
	// await page.addScriptTag({url: 'https://www.google.com/recaptcha/api.js?render=6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC'})
	// Ждем, пока reCAPTCHA загрузится
	// await page.waitForFunction(() => typeof grecaptcha !== 'undefined')
	let token = await page.evaluate(async () => {
		return await grecaptcha.execute('6LdqZvcZAAAAAO2mSKVf_YfxeogksV9ZXL8wG-uC', {action: 'submit'})
	})
	
	// Закрываем браузер
	await browser.close()
	return token
}

async function sendRequest(token,exposeeId) {
	const axios = require('axios')
	try {
		let SERVICE_URL = 'https://www.meinestadt.de/_re-service/contact'
		console.log(SERVICE_URL)

		console.log(token)
		let formData = {
			email: 'dyyd3265@gmail.com',
			salutation: 'm',
			firstname: 'Vlad',
			lastname: 'Tkachenko',
			message: 'Guten Tag, mich interessiert dieses Angebot.',
			captchaToken: token,
			phone: '4915204395310'
		}
		
		await axios.post(SERVICE_URL, {
				...formData,
				realEstateId: exposeeId
			}, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Cookie': '__Secure-3PSID=g.a000ugg8m7VGwXZ6xfYaCj5gVbUKHgFES8o_LOPsPuRNHV3DoNK2613nuNqHSRf_gqd3Ik6B-wACgYKAakSARMSFQHGX2MiRd0W_zl5dEsxwpI0qzC6NBoVAUF8yKoA24pa7ahNNRBkk1k5z0cO0076; __Secure-3PAPISID=I816GiKDaKO7w_VV/A7mSZEysM2bMoj2pC; NID=522=F548f6B9y1v2xV1beo27PsvbYFAJjNZAfN24exauql5tz0B5SERdc4GtyUuUWNkmv54i3G7O_PcAl_k4q1I541MFKJgdP_l8ljEP1o9dq1JisZCBQjyiaNvTRWvJJGPogVrWkJnSUTkZCSanVxC388PE17PVyOWwC9nfMEBZfom8iIRIUwc_1hVFhzTbMWlKxQ5ECb-bV7t1nhBis0VcpNNVuT-xJhurhZTv5sCVU8OPVx1fmiM3TV11aWhTz5HiDwhvmsXGgq7t9lRwmLGXG77Dp1t31TejMMuVLMJqtgRmeHpgsZWpcyL2KlnlE1H6EgdJPegociaypG77O-0iYgPQTIgWaXQTF6lLuqmi2M_re8HNLOrHggUMiXbuvlGEyLRR7wSd8cICqItnfQHvDopntiBqJ_14_QAVFyGJIKY_Alinau1RY4APrResb62b5JebpEtFw8dK0zesj_2_Qome6VSSkXj62GnZojW29SdqIz0FpS-JCN6xT5sg7AvxBei5da6wunRX4iK1MJ5KIBytJKwYTyvD6R6HnRHtUCCdNBF5UUcoslNFkrj_7S5ePiDmH-JBEkANQwF5oFhF3cuaznXCmIWGqvaTrush5CwV2v85tpcV3DlC2MXB8N0OoCnVjt1pWpRY1wr645pI5bGpML1eQpdXTSgaqxclS4CABP2kAiUMFd-koYhtbUCDojR9BkhKdLPcSZPXMGeVWA-OwESX6hi_AXHzDb7JJsXFK4Hq-fb4LciZrrtK9XTgV7tuFKTDApPCa27ONxCOo76zyd_T5vWfQXVqPkVsUuymk_Hcx2b6axp20FFe8MQESYU7LX6Z2dllt4K_zsyl1nrC51iOCDpMYXMJ4hGMzq7htfQTa2qXptRUrhoR0M0cSicNOO_rikqePdrpstLusyAE2kXA_2vtM3UsMCuaSDeqa7HINqdDAyz3ZQkjbyZJbgYU1xte8F_c3laIgSnBK_UPACROWFmd2T98cH8jfFZXqDyFdWPpI6Rh6qhXuDPRAdf2vrtlxPhApWJhqi8C1vWP720CSAuwlMAXvu5BwEAgj-57OoNvXsb_07v4RZP1GfmU3HM2i7pfHXS6ukY0wBbZAus-hoHaXT6ke0saIdSU18Yb0FzGgdgN7WyTD9Kqgmgun5q-LmqD-Ufc0h7mmpLGg6bP9vWZj3xsFzUfGcgzppQtK1opbdtw46w-9FuJHTYc8WdzqO8G2Uo1L6UATqr1Xjfn7Wk0ruFJB4xo6VV7zwLOL5GNAfIHrOdjR5kAIEwmG1nbTUqmbjeEMrDT9THbuTIY4Zetw9olblITCapH0cfV3bWDtfAnhibXcRFAmTh_Icmu5pQZDpnNoszrcJcYAmCETshlH_Jlfm_Tde5uYmy-KHwnVECsEEB9xtVC3j1mr5coABvlmaz_iE29QfVXuvX5JGzISJZInusEfRrj_ygHONI4ZoEDd97ByK5O9wYF41zRlwXFYYw5E56Rgo5tVRELCC8z51s5_9LMf8RKd2D5LLriHAIx7zRLaTlp_nhBLyrrbXcr-P5TEIm0kzM8tE_d0kJWD8_jau4MXxPx2bZ-6AAVourxKclOgNoJrvPWzKhY-_67odMW9ykDSr9TUgcDNdMA7q-6h6kxa-c7avq1gv_uf-PSjsAF_qytl9FIQZ4ruZ1EJQie99SAZDRLIHgK4M8otQzSpnllo28_1PTnmuzCEVXpHNZxCKi-uQGcD7pO9UAV44cfrHUwahKKFFvWYPBPbeER3n1T_I2kgjhvSFJuL1I; __Secure-3PSIDTS=sidts-CjEBEJ3XV3mIvW072BDgOTImIRDt8a8m1Ud16DQ46bJEh0fM493ji4Ije4EbsgcpxQOTEAA; __Secure-3PSIDCC=AKEyXzWWrfqE7tYT838tNp_NMU3PjKuvTwOLlmeQcwezW7KNU3KaBXTU98ZgwBQCw_y_F7jdaz0',
					// 'Cookie': '__Secure-3PSID=g.a000ugg8m7VGwXZ6xfYaCj5gVbUKHgFES8o_LOPsPuRNHV3DoNK2613nuNqHSRf_gqd3Ik6B-wACgYKAakSARMSFQHGX2MiRd0W_zl5dEsxwpI0qzC6NBoVAUF8yKoA24pa7ahNNRBkk1k5z0cO0076; __Secure-3PAPISID=I816GiKDaKO7w_VV/A7mSZEysM2bMoj2pC; NID=522=F548f6B9y1v2xV1beo27PsvbYFAJjNZAfN24exauql5tz0B5SERdc4GtyUuUWNkmv54i3G7O_PcAl_k4q1I541MFKJgdP_l8ljEP1o9dq1JisZCBQjyiaNvTRWvJJGPogVrWkJnSUTkZCSanVxC388PE17PVyOWwC9nfMEBZfom8iIRIUwc_1hVFhzTbMWlKxQ5ECb-bV7t1nhBis0VcpNNVuT-xJhurhZTv5sCVU8OPVx1fmiM3TV11aWhTz5HiDwhvmsXGgq7t9lRwmLGXG77Dp1t31TejMMuVLMJqtgRmeHpgsZWpcyL2KlnlE1H6EgdJPegociaypG77O-0iYgPQTIgWaXQTF6lLuqmi2M_re8HNLOrHggUMiXbuvlGEyLRR7wSd8cICqItnfQHvDopntiBqJ_14_QAVFyGJIKY_Alinau1RY4APrResb62b5JebpEtFw8dK0zesj_2_Qome6VSSkXj62GnZojW29SdqIz0FpS-JCN6xT5sg7AvxBei5da6wunRX4iK1MJ5KIBytJKwYTyvD6R6HnRHtUCCdNBF5UUcoslNFkrj_7S5ePiDmH-JBEkANQwF5oFhF3cuaznXCmIWGqvaTrush5CwV2v85tpcV3DlC2MXB8N0OoCnVjt1pWpRY1wr645pI5bGpML1eQpdXTSgaqxclS4CABP2kAiUMFd-koYhtbUCDojR9BkhKdLPcSZPXMGeVWA-OwESX6hi_AXHzDb7JJsXFK4Hq-fb4LciZrrtK9XTgV7tuFKTDApPCa27ONxCOo76zyd_T5vWfQXVqPkVsUuymk_Hcx2b6axp20FFe8MQESYU7LX6Z2dllt4K_zsyl1nrC51iOCDpMYXMJ4hGMzq7htfQTa2qXptRUrhoR0M0cSicNOO_rikqePdrpstLusyAE2kXA_2vtM3UsMCuaSDeqa7HINqdDAyz3ZQkjbyZJbgYU1xte8F_c3laIgSnBK_UPACROWFmd2T98cH8jfFZXqDyFdWPpI6Rh6qhXuDPRAdf2vrtlxPhApWJhqi8C1vWP720CSAuwlMAXvu5BwEAgj-57OoNvXsb_07v4RZP1GfmU3HM2i7pfHXS6ukY0wBbZAus-hoHaXT6ke0saIdSU18Yb0FzGgdgN7WyTD9Kqgmgun5q-LmqD-Ufc0h7mmpLGg6bP9vWZj3xsFzUfGcgzppQtK1opbdtw46w-9FuJHTYc8WdzqO8G2Uo1L6UATqr1Xjfn7Wk0ruFJB4xo6VV7zwLOL5GNAfIHrOdjR5kAIEwmG1nbTUqmbjeEMrDT9THbuTIY4Zetw9olblITCapH0cfV3bWDtfAnhibXcRFAmTh_Icmu5pQZDpnNoszrcJcYAmCETshlH_Jlfm_Tde5uYmy-KHwnVECsEEB9xtVC3j1mr5coABvlmaz_iE29QfVXuvX5JGzISJZInusEfRrj_ygHONI4ZoEDd97ByK5O9wYF41zRlwXFYYw5E56Rgo5tVRELCC8z51s5_9LMf8RKd2D5LLriHAIx7zRLaTlp_nhBLyrrbXcr-P5TEIm0kzM8tE_d0kJWD8_jau4MXxPx2bZ-6AAVourxKclOgNoJrvPWzKhY-_67odMW9ykDSr9TUgcDNdMA7q-6h6kxa-c7avq1gv_uf-PSjsAF_qytl9FIQZ4ruZ1EJQie99SAZDRLIHgK4M8otQzSpnllo28_1PTnmuzCEVXpHNZxCKi-uQGcD7pO9UAV44cfrHUwahKKFFvWYPBPbeER3n1T_I2kgjhvSFJuL1I; __Secure-3PSIDTS=sidts-CjEBEJ3XVxiPh_K9XZUpvZ7K-u5Dcz0obBqd7vcIB1ch_1qN4vvfFlcF7IKKNkUwGpXFEAA; __Secure-3PSIDCC=AKEyXzWLqnDhelEj4dMfnNbp9pwV8kQlvgVRRSCH53_VfvXmPM_TH0zZWuY0XYLuuoZajYh-UcQ',
					// 'Cookie': 'AMCVS_24D022CE527854F10A490D4D%40AdobeOrg=1; s_cc=true; _sp_v1_p=129; _sp_v1_data=1025453; _sp_su=false; c_tea=,aa,; c_te=1; c_te2=0; consentUUID=9b0bc621-6a80-46c0-8239-32817015d39e_41; consentDate=2025-03-11T17:06:50.355Z; cmp_ms_p=; _sp_v1_ss=1:H4sIAAAAAAAAAItWqo5RKimOUbKKxsrIAzEMamN1YpRSQcy80pwcILsErKC6lgwJJR1MK6FqBpFBRJgYo5SZl1kCZBmamxiaGxpZWFiSFR6xAKjJ7ZKEAQAA; bx=0caba76acf164a039659065abdfda8df; bm_mi=FFEF0B36C45508EF755F73EFE114DD76~YAAQnGZWuGN0SI6VAQAA7Ly2lRvlbGs5IvhKyWfOGnke9wdRanE3D0wSBKc4fjBUGa/Gwbs1F3o/HAlf9ACq/QuZvuOZu08uGy2rE1lVGbtC1iaJmrqbQhnUWgJxwNdTvx5KaJgsiYrRFS0l4hwaOXSCiv2QBXE8f04baAd8JF5pBgMyrD4mWo1p9SKDPMm+gMgnv5E+s2Kfr8ukwiFYBEnul6daeorh7Xvsm7XCpNRvuRmHOGeiTtjbYCedthlNGx4DjEXW3M8fqSgcNhXNCtz04DX4aaCS0Y4P80kO7eBZ8DzEiSZeLy5R6xXPnllTPP75EuHqYRG8P3qkFA==~1; ak_bmsc=733E1FD81240077E244E20082BFA5790~000000000000000000000000000000~YAAQnGZWuGZ5SI6VAQAA0sy2lRuTyCrxG8oCUjZt0NC3G/QMhN4ZZj7g1HMKVJETkHIXurKDgx9uu7/Uf4mZGZ/3Mx59OsqWqkJabt7ouh3PsI5quOSbBdAXlLajDjw5jDgk3yWkdwYRTmPdIJu/P5b8+ntgzP49V0ZhSxFtOJFguhhROHc44N7htmBXQnzFD57pAbCh+xyKl+mma1HtTcHQL4u8RWENgwLI7ZzyVp7RSluLQO5JJ9BlyBMnPbz6iQY21oJqtfapH/Ds4tEx8O94rzO1z7OuuZo0XCuTw31JBS/+3rjDWnJs5wrlwsLrlQ9eVzI6Sdrii5VcicRmiAcxBU+ntf9jfNSlrbSgsXzeVv94fdIYQU2gJuuScXOvA65V26wX9cFg3KaKsNVTP7CDWAJSvVI7USy6iajAWb/48OjcYkM2BlkoDA/z+QrzmQuO6snV+H4hyHZzGfZJTqJnFWnhheC9qLGVvywUBfKCUydKiqbI1sXK37qvJ6g=; wd=a0924f7ce1bc487a90d55063cc1bfaff; xy=a0924f7ce1bc487a90d55063cc1bfaff; _hjSession_1377412=eyJpZCI6Ijc1MDhiNWNiLWNjYTItNGJhNS1iZjE3LWQ3MWFjMWE4NjM2MCIsImMiOjE3NDE5NzM1NDk0ODAsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MH0=; _hjSessionUser_1377412=eyJpZCI6Ijg3ZDQ5NWE0LTM1ZjctNTU1OS04MDFjLTNhZWM1MTJmODVlZiIsImNyZWF0ZWQiOjE3NDE5NzM1NDk0ODAsImV4aXN0aW5nIjp0cnVlfQ==; AMCV_24D022CE527854F10A490D4D%40AdobeOrg=-1124106680%7CMCIDTS%7C20161%7CMCMID%7C41441849371494397052549983309530771185%7CMCOPTOUT-1741981557s%7CNONE%7CvVersion%7C5.2.0%7CMCAID%7CNONE%7CMCAAMLH-1742579157%7C6%7CMCAAMB-1742579157%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI; bm_sv=A5ABCD2B0691C4A2515CBC79A104EA83~YAAQiGZWuIQ5CIWVAQAA4ezhlRu7ICboewIgfgme6LzEoeUf3uF30ZUdfYihJXl0Vn8HpbNoPy34fXiWoMafC15oGa661folslRvch+nrCSRMLc/velN5uv5OfG1HXkexz7VQZv5z0UW2wuF/aDcMVrBlIf2++QZJTLeL7ssi63R6aVWrtbWUf0Sl9mlu0yq2Dq/wiWvi9lfVWtrbmr4bgNRWuO6y/4LfjhL7RxqY9pSvISiJW7SxcohroqGjgfiplAW9A==~1; _rdt_uuid=1741713123654.b8bda591-ced9-4b34-b207-0dfcc3e9429d; utag_main=v_id:0195862c4b3c000bfdf8aaf3272f0506f001a06700bd0$_sn:10$_se:23$_ss:0$_st:1741978172616$vapi_domain:meinestadt.de$ses_id:1741973539633%3Bexp-session$_pn:9%3Bexp-session; s_sq=stepstonemeinestadtde%3D%2526c.%2526a.%2526activitymap.%2526page%253Dimmobilien_expose_eigeninventar%2526link%253DAnfrage%252520absenden%2526region%253Dmaincontent%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dimmobilien_expose_eigeninventar%2526pidt%253D1%2526oid%253DAnfrage%252520absenden%2526oidt%253D3%2526ot%253DSUBMIT\n/A7mSZEysM2bMoj2pC; NID=522=F548f6B9y1v2xV1beo27PsvbYFAJjNZAfN24exauql5tz0B5SERdc4GtyUuUWNkmv54i3G7O_PcAl_k4q1I541MFKJgdP_l8ljEP1o9dq1JisZCBQjyiaNvTRWvJJGPogVrWkJnSUTkZCSanVxC388PE17PVyOWwC9nfMEBZfom8iIRIUwc_1hVFhzTbMWlKxQ5ECb-bV7t1nhBis0VcpNNVuT-xJhurhZTv5sCVU8OPVx1fmiM3TV11aWhTz5HiDwhvmsXGgq7t9lRwmLGXG77Dp1t31TejMMuVLMJqtgRmeHpgsZWpcyL2KlnlE1H6EgdJPegociaypG77O-0iYgPQTIgWaXQTF6lLuqmi2M_re8HNLOrHggUMiXbuvlGEyLRR7wSd8cICqItnfQHvDopntiBqJ_14_QAVFyGJIKY_Alinau1RY4APrResb62b5JebpEtFw8dK0zesj_2_Qome6VSSkXj62GnZojW29SdqIz0FpS-JCN6xT5sg7AvxBei5da6wunRX4iK1MJ5KIBytJKwYTyvD6R6HnRHtUCCdNBF5UUcoslNFkrj_7S5ePiDmH-JBEkANQwF5oFhF3cuaznXCmIWGqvaTrush5CwV2v85tpcV3DlC2MXB8N0OoCnVjt1pWpRY1wr645pI5bGpML1eQpdXTSgaqxclS4CABP2kAiUMFd-koYhtbUCDojR9BkhKdLPcSZPXMGeVWA-OwESX6hi_AXHzDb7JJsXFK4Hq-fb4LciZrrtK9XTgV7tuFKTDApPCa27ONxCOo76zyd_T5vWfQXVqPkVsUuymk_Hcx2b6axp20FFe8MQESYU7LX6Z2dllt4K_zsyl1nrC51iOCDpMYXMJ4hGMzq7htfQTa2qXptRUrhoR0M0cSicNOO_rikqePdrpstLusyAE2kXA_2vtM3UsMCuaSDeqa7HINqdDAyz3ZQkjbyZJbgYU1xte8F_c3laIgSnBK_UPACROWFmd2T98cH8jfFZXqDyFdWPpI6Rh6qhXuDPRAdf2vrtlxPhApWJhqi8C1vWP720CSAuwlMAXvu5BwEAgj-57OoNvXsb_07v4RZP1GfmU3HM2i7pfHXS6ukY0wBbZAus-hoHaXT6ke0saIdSU18Yb0FzGgdgN7WyTD9Kqgmgun5q-LmqD-Ufc0h7mmpLGg6bP9vWZj3xsFzUfGcgzppQtK1opbdtw46w-9FuJHTYc8WdzqO8G2Uo1L6UATqr1Xjfn7Wk0ruFJB4xo6VV7zwLOL5GNAfIHrOdjR5kAIEwmG1nbTUqmbjeEMrDT9THbuTIY4Zetw9olblITCapH0cfV3bWDtfAnhibXcRFAmTh_Icmu5pQZDpnNoszrcJcYAmCETshlH_Jlfm_Tde5uYmy-KHwnVECsEEB9xtVC3j1mr5coABvlmaz_iE29QfVXuvX5JGzISJZInusEfRrj_ygHONI4ZoEDd97ByK5O9wYF41zRlwXFYYw5E56Rgo5tVRELCC8z51s5_9LMf8RKd2D5LLriHAIx7zRLaTlp_nhBLyrrbXcr-P5TEIm0kzM8tE_d0kJWD8_jau4MXxPx2bZ-6AAVourxKclOgNoJrvPWzKhY-_67odMW9ykDSr9TUgcDNdMA7q-6h6kxa-c7avq1gv_uf-PSjsAF_qytl9FIQZ4ruZ1EJQie99SAZDRLIHgK4M8otQzSpnllo28_1PTnmuzCEVXpHNZxCKi-uQGcD7pO9UAV44cfrHUwahKKFFvWYPBPbeER3n1T_I2kgjhvSFJuL1I; __Secure-3PSIDTS=sidts-CjEBEJ3XV3mIvW072BDgOTImIRDt8a8m1Ud16DQ46bJEh0fM493ji4Ije4EbsgcpxQOTEAA; __Secure-3PSIDCC=AKEyXzWWrfqE7tYT838tNp_NMU3PjKuvTwOLlmeQcwezW7KNU3KaBXTU98ZgwBQCw_y_F7jdaz0'
				}
			}
		).then(response => {
			console.log(response.status, response.data)
		})
		console.log('Заявка отправлена')
	} catch (error) {
		console.error('Ошибка:', error.message)
	}
}

async function findLocation(query) {
	const axios = require('axios')
	const url = 'https://www.meinestadt.de/_home-service/citySearch'
	const params = {
		query: query,
		excludeTypeLevel: 'REGIONS'
	}
	const headers = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		'Accept': 'application/json'
	}
	
	try {
		const response = await axios.get(url, {params, headers})
		const data = response.data
		
		const locations = data.flatMap(group => group.locations.filter(loc => loc.cityCenter) // Оставляем только те, у которых есть координаты
			.map(loc => ({
				id: loc.id,
				name: loc.name,
				longitude: loc.cityCenter.longitude,
				latitude: loc.cityCenter.latitude
			})))
		
		return locations.find(location => location.name === query) || locations[0]
		
	} catch (error) {
		console.error('Ошибка запроса:', error.response ? error.response.data : error.message)
	}
}

async function filterApartments(apartments) {
	return apartments.filter(item => {
		// if (!item.equipment.includes('WG geeignet') || item.equipmentAsString.includes('WG geeignet')) {
		if (!item.title.includes('TAUSCHWOHNUNG')) {
			return item.priceRaw >= 300 && item.priceRaw <= 800
		}
	})
}

async function getApartments(location) {
	const axios = require('axios')
	const url = 'http://www.meinestadt.de/_re-service/get-items'
	
	const headers = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		'Referer': 'https://www.meinestadt.de/',
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Cookie': 'bm_sv=8A9FF742D3BE60CD1123760F7F35C41B~YAAQnGZWuCyVIVuVAQAA4HEdiRtdgnLdvznkOIZIR8MpSSxi5mp9s6ZmmPsAY+a0GJ4BaPmWweutUzxbulMY/q5RRqiHZ4wWhiHh6GIDPVvpcvDPBXznhJHyExuhVSqoS9EdN/zqdeyou/K5sQa+4jmdN/RXVhVpGS1mbKKjLlwQKEj6a7CCvXeyhJ5zN8RNF7Oe6r8vJVfbv+MfOe/a48cPxc6hyjrAsAUt0XX6kJFr6pxFIul4Eg4AyG0mcAiYYf/geg==~1'
	}
	
	const data = {
		location: location.id,
		lat: location.latitude,
		lng: location.longitude,
		page: 1,
		pageSize: 2000000,
		sr: '20',
		sort: 'distance',
		etype: 1,
		esr: 2,
		eqid: [],
		furnid: -1,
		epos: [],
		ecat: []
	}
	
	try {
		const response = await axios.post(url, data, {headers})
		return response.data.items
	} catch (error) {
		console.error('Ошибка запроса:', error.response ? error.response.data : error.message)
	}
}

module.exports = {
	findLocation,
	filterApartments,
	getApartments,
	getToken,
	sendRequest
}