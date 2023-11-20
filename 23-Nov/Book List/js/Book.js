export default class Book {
	constructor(id, title, author, img, progress = 0) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.img = img;
		this.progress = progress;
	}
}
