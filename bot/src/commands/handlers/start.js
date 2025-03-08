async function start(ctx) {
	fetch('http://host.docker.internal:80/api/checkUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			telegram_id: '12331241421'
		})
	}).then(res => {
		if (res.status === 200) {
			console.log(JSON.stringify(res.data))
		}
	})
}

module.exports = start