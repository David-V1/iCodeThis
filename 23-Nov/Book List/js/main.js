import Book from "./Book.js";
import BookManager from "./BookManager.js";
import BookUI from "./BookUI.js";

document.addEventListener("DOMContentLoaded", () => {
	const bookManager = new BookManager();

	const book1 = new Book(
		1,
		"Your Website Sucks: Here's how to fix it",
		"Brian David Hall",
		"https://m.media-amazon.com/images/I/61fe19iGnKL._SY522_.jpg"
	);
	const book2 = new Book(
		2,
		"Don't Make Me Think, Revisited",
		"Steve Krug",
		"https://m.media-amazon.com/images/I/41NxjvqmCJL._SX342_SY445_.jpg"
	);
	const book3 = new Book(
		3,
		"The Design Of Everyday Things",
		"Don Norman",
		"https://m.media-amazon.com/images/I/41BgyERNZHL._SY445_SX342_.jpg"
	);

	const book4 = new Book(
		4,
		"HTML and CSS: Design and Build Websites",
		"Jon Duckett",
		"https://m.media-amazon.com/images/I/613ZTDcDsiL._SY522_.jpg"
	);

	const book5 = new Book(
		5,
		"Building Websites All-in-One For Dummies",
		"David Karlins",
		"https://m.media-amazon.com/images/I/717vmakyQEL._SY522_.jpg"
	);

	const book6 = new Book(
		6,
		"Thinking with Type",
		"Ellen Lupton",
		"https://m.media-amazon.com/images/I/71ZO6EyOZ3L._SY522_.jpg"
	);

	bookManager.addBookToAll(book1);
	bookManager.addBookToAll(book2);
	bookManager.addBookToAll(book3);
	bookManager.addBookToAll(book4);
	bookManager.addBookToAll(book5);
	bookManager.addBookToAll(book6);
	bookManager.addBookToReading(book1);
	bookManager.addToWishlist(book3);

	const ui = new BookUI(bookManager);
});
