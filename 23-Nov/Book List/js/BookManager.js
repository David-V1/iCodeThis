export default class BookManager {
	constructor() {
		this.reading = [];
		this._wishlist = [];
		this.purchased = [];
		this._allBooks = [];
	}

	addBookToList(book, list) {
		if (!list.includes(book)) {
			list.push(book);
			this.addBookToAll(book);
		}
	}

	addBookToReading(book) {
		this.addBookToList(book, this.reading);
		if (!this.purchased.includes(book)) {
			this.addBookToList(book, this.purchased);
		}
	}

	addToWishlist(book) {
		this.addBookToList(book, this._wishlist);
	}

	purchaseBook(book) {
		this.addBookToList(book, this.purchased);
		this.removeFromList(book, this._wishlist);
	}

	addBookToAll(book) {
		if (!this._allBooks.includes(book)) {
			this._allBooks.push(book);
		}
	}

	removeFromList(book, list) {
		const index = list.indexOf(book);
		if (index > -1) {
			list.splice(index, 1);
		}
	}
	findBookById(bookId) {
		return this._allBooks.find((book) => book.id === Number(bookId));
	}

	get readingList() {
		return this.reading;
	}

	get wishlist() {
		return this._wishlist;
	}

	get purchasedBooks() {
		return this.purchased;
	}

	get allBooks() {
		return this._allBooks;
	}
}
