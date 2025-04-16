class User {
	constructor(telegramId, firstName, lastName, email, phone, city, min_price, max_price, min_rooms, max_rooms, description) {
		this.telegramId = telegramId
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.phone = phone
		this.city = city
		this.min_price = min_price
		this.max_price = max_price
		this.min_rooms = min_rooms
		this.max_rooms = max_rooms
		this.description = description
	}
}