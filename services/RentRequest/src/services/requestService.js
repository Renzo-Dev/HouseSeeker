async function sendRequest(token, user, exposeeId) {
	const axios = require('axios')
	try {
		let SERVICE_URL = 'https://www.meinestadt.de/_re-service/contact'
		// ДОДЕЛАТЬ БОТА
		// console.log(token)
		// let formData = {
		// 	email: user.email,
		// 	salutation: 'm',
		// 	firstname: user.first_name,
		// 	lastname: user.last_name,
		// 	message: user.description,
		// 	captchaToken: token,
		// 	phone: user.phone
		// }
		
		console.log(token)
		let formData = {
			email: 'kovelenkodima@gmail.com',
			salutation: 'm',
			firstname: 'Dan',
			lastname: 'Koshevoy',
			message: 'Guten Tag, mich interessiert dieses Angebot.',
			captchaToken: token,
			phone: '4915204395231'
		}
		
		await axios.post(SERVICE_URL, {
				...formData,
				realEstateId: exposeeId
			}, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					// 'Cookie': '__Secure-3PSID=g.a000ugg8m7VGwXZ6xfYaCj5gVbUKHgFES8o_LOPsPuRNHV3DoNK2613nuNqHSRf_gqd3Ik6B-wACgYKAakSARMSFQHGX2MiRd0W_zl5dEsxwpI0qzC6NBoVAUF8yKoA24pa7ahNNRBkk1k5z0cO0076; __Secure-3PAPISID=I816GiKDaKO7w_VV/A7mSZEysM2bMoj2pC; NID=522=kqm09zZa9Y6VeM0hvOjxou_ztIh4e35xVw5ki_3kFLTfqYfkah-HWVSF-FM10XI2VgskAdH4kiIK5C7mY6Dkl58zxw97CJG-tva7KzY_0IW0XnzlcT19TO-mZHCWjjGttAinDkg5sAQFxoOi7ZJVzPu02y-SVGIJJ0B2UA6hlPgdl31RikJNoxTBlAX9xYLGKp3zZjbQ7TB6rjT9rlcTZnpTfAR-USdDEVtyimLrLx7gvq8fACwbMD5zoPWAReC_gnSxiFHx-Yj5ANjYV77hIQgzQ5ksAwtf-TJPXayRYakeocccqg7QUuhMDg6XWJLSNSi4xm25csLbJ6MotF7kzPlmkjjnB3Zl1tkqg2VPd8HBGR86pMTBUN8IbCkBd5kID5ZLac3LIpbFbuuyENrDbBICNdkx6sls6sY3DlFn0NDgos91Ba07DrYgdoSphVNPK7vv9YZnIX0E2EKOerzInfuEz69OOhuf37XAaxHbtGFlypj4LpPOGOnJ_tj7_krA_COCD0TQWm_nW02MDz5h7yEgmRSmOO5kkGwFYFSbwbUZhzoUy0YGCEUOqMh93PisHD6Mq93kyw6Lkz5bKMFWwgUL9y1cP1yI2qZUr8bYufoptbDAQ60p_B_9dDkJDqjUt1iw4MJwbx_qzPvFkCHUEe8l4NzW7Uc_P_KZ34s07o4D_jmuR7_H9iPRe0HlQgkEwiYUp3fSYCTruqcGl5ePe0WAJmM6H3dKpXhQHo1EHz5awQTFawmJjScKyAz3BL9JNtqPMmZz-_sF16KRbD973Ba8SspiAxNozcBGthP7k8HYsRCCbF-UcsSdNshOe84PaR6kg95YkoBhCf0102QrV46eXb1LeBjv4tszIyDeM6aUYcFFkq-kO5Psb7xzkzToEr6wbz_XUkxCJ_NLAmKBFjFCQgakuRlFwmRcIkQGN1n4xYF7p0oDPh5fBXnqsLHWoiSelohW2trWYLvoe3IZoB-iPghPrmTQavR7JCHeMztsmbNsqRUTRVrs43WxViskJ9gqaSVG6W03hYD-64B4yU6SRFpbM5pXzeu3grjt7LinVvZQDIslphHhHdO3lzbvvx2BmbQifVo4_j7BKkWp9qod-HzW96qKbO732Y-pophdoFmKIyXpwfvpLGVP-zBsM7WeXmkJyyuSPU1TQ7AGQdR2fFfu66uZ8FapY7V6agezri7dQqFCHoyI-3lQUeDf3yDfwPybiuj7jKoG77I-vQIvXHXjGnAsV1TV6vtO_uOhX2wtErXi6xGdjKFPRQyMWnhaaasRN1ZDMTAdYkaw4g_JUGfH9QoLfiRDssFlVM1e72YTcIh1eo3wqEGqhGMTme48StPlDL_TGl46kFzjEteceMQnDn9ZrethTg9cXvI6SIYsAw_fto7aRCF8qW5O5oyRuljI6f-KhHIlIsrktFgTYE3l_qFZ_0AV406d43r40olmJyY-iCsYS-dAsvCLBGhCuJwEVrF-q3DTEMAr948ZcJY2uvZ2KziayJZNTVdjPqKax50JD8tjtJ5IQ-uE64E8bF5w8hmpV0gHJAc3CGIRWaYYR3I2p32CN1e9rwBkk18s7yZ-5d_Ec4Wd7EVUsC15VDVBTeSU_fZLMS7Fc8maaxhac0N8wL4CIoIW_Dui5Y1uqWWcM2yA87KzTu8qYSMW3xzk2Ho5s2iHpEOlS2HYSxOiHvaPs9UdMHd4F_yBOuF3fvAC-aky1T4h9EWaEfnkhdQ3bxPMsUz5w27vhdfl1V6R7J3N052qSB-gY7Q65UGH_PJHcW0; __Secure-3PSIDTS=sidts-CjEB7pHptWspHD2tkwn-rot4fWTFrFOfVZKT2iYx28_jkFUgIpS2TxyeSDbwz2EaFz0GEAA; __Secure-3PSIDCC=AKEyXzWmuwlS16E8CGeE9ug5aVZDAuzK63mRJKu07bBy2_wVJrYlHnDlIGNqO2_g8VVcqwg0Vl8',
					'Cookie': '__Secure-3PSIDCC=AKEyXzUbS1P6ootOOexVBo13p3nTGPclNShkmHUAUqwM8Fau482C9_ZShiXeapVMW3pyv4aWMU0; expires=Mon, 16-Mar-2026 21:59:23 GMT; path=/; domain=.google.com; Secure; HttpOnly; priority=high; SameSite=none'
				}
			}
		).then(response => {
			console.log(response.status, response.data)
		})
		console.log('Заявка отправлена')
		return true
	} catch (error) {
		console.error('Ошибка:', error.message)
		return false
	}
}

module.exports = sendRequest