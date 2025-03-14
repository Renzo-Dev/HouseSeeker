class User {
	constructor(telegram_id,firstName, lastName, email, phone, city, minPrice, maxPrice, rooms, description) {
		this.telegram_id = telegram_id
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.phone = phone
		this.city = city
		this.minPrice = minPrice
		this.maxPrice = maxPrice
		this.rooms = rooms
		this.description = description
	}
}

module.exports = User