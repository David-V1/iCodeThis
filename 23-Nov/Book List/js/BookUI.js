export default class BookUI {
	constructor(bookManager) {
		this.bookManager = bookManager;
		this.tabEventListener();
		this.handleBookListInteractions();
		this.handleRemoveBook();
		this.currentCategory = "allbooks"; // state
		this.updateActiveTab(this.currentCategory);
		this.displayBooks(this.currentCategory);
	}

	tabEventListener() {
		const tablinks = document.querySelectorAll(".tablink");

		tablinks.forEach((tab) => {
			tab.addEventListener("click", (e) => {
				tablinks.forEach((tab) =>
					tab.classList.remove("active-tablink")
				);

				if (tab.id === e.target.id) {
					tab.classList.add("active-tablink");
				}

				this.currentCategory = e.target.id;
				this.displayBooks(e.target.id);
			});
		});
	}

	updateActiveTab(activeTabId) {
		const tablinks = document.querySelectorAll(".tablink");
		tablinks.forEach((tab) => {
			tab.classList.remove("active-tablink");

			if (tab.id.toLocaleLowerCase() === activeTabId) {
				tab.classList.add("active-tablink");
			}
		});
	}

	switchToAllBooksView() {
		const allBooksTabId = "allbooks";
		this.updateActiveTab(allBooksTabId);
		this.displayBooks(allBooksTabId);
	}

	handleBookListInteractions() {
		const bookListDiv = document.getElementById("bookList");
		bookListDiv.addEventListener("click", (event) => {
			let bookEl = event.target.closest(".book-card");
			if (!bookEl) return;

			const bookId = bookEl.dataset.id;

			const book = this.bookManager.findBookById(bookId);
			if (!book) {
				console.error("Book not found");
				return;
			}

			if (event.target.classList.contains("add-to-wishlist")) {
				if (
					!this.bookManager.wishlist.includes(book) &&
					!this.bookManager.purchasedBooks.includes(book)
				) {
					this.snackbar(
						`${book.title} added to Wishlist`,
						true,
						2500
					);
					this.bookManager.addToWishlist(book);
				} else {
					this.snackbar(`${book.title} already added!`, false, 2500);
				}
			} else if (event.target.classList.contains("purchase-book")) {
				if (!this.bookManager.purchasedBooks.includes(book)) {
					this.snackbar(`${book.title} Purchased`, true, 4000);
					this.bookManager.purchaseBook(book);
				} else {
					this.snackbar(
						`${book.title} has already been purchased`,
						false,
						4000
					);
				}
			} else if (event.target.classList.contains("add-to-reading")) {
				if (!this.bookManager.readingList.includes(book)) {
					this.snackbar(`Reading: ${book.title}`, true, 4000);
					this.bookManager.addBookToReading(book);
				} else {
					this.snackbar(
						`${book.title} is already in your Reading list`,
						false,
						4000
					);
				}
			}
		});
	}

	generateCloseButton(category) {
		let iconHtml = "";
		// buggy logic -> ||
		if (category.toLowerCase() === "wishlist") {
			iconHtml = `<button><span id="close-icon" class="material-symbols-outlined">close</span></button>`;
		} else if (category.toLowerCase() === "purchased") {
			iconHtml = `<button><span id="close-icon" class="material-symbols-outlined">close</span></button>`;
		}
		return iconHtml;
	}

	handleRemoveBook() {
		const bookListDiv = document.getElementById("bookList");

		bookListDiv.addEventListener("click", (e) => {
			let xIcon = e.target.closest("#close-icon");
			if (!xIcon) return;

			const bookId = e.target.closest(".book-card").dataset.id;
			const book = this.bookManager.findBookById(bookId);

			if (!book) {
				console.error("Book Not Found...");
				return;
			}
			const bookList = this.getBookListByCategory(this.currentCategory);
			this.bookManager.removeFromList(book, bookList);
			this.displayBooks(this.currentCategory);
			this.snackbar(`${book.title} removed!`, false);
		});
	}

	getBookListByCategory(category) {
		switch (category.toLowerCase()) {
			case "reading":
				return this.bookManager.readingList;
			case "wishlist":
				return this.bookManager.wishlist;
			case "purchased":
				return this.bookManager.purchasedBooks;
			case "allbooks":
				return this.bookManager.allBooks;
			default:
				return [];
		}
	}

	generateActionButtons(category) {
		let buttonsHtml = "";
		if (category.toLowerCase() === "allbooks") {
			buttonsHtml = `
            <div class="action-btn-wrapper">
                <div class="book-actions">
                    <button class="btn add-to-wishlist">Add to Wishlist</button>
                    <button class="btn purchase-book">Purchase</button> 
                </div>
            </div>
        `;
		}
		if (category.toLowerCase() === "purchased") {
			buttonsHtml = `
                <div class="action-btn-wrapper">
                    <div class="book-actions">
                        <button class="btn add-to-reading">Read</button>
                    </div>
                </div>
            `;
		}
		if (category.toLowerCase() === "wishlist") {
			buttonsHtml = `
			    <div class="action-btn-wrapper">
			        <div class="book-actions">
			            <button class="btn purchase-book">Purchase</button>
			        </div>
			    </div>
			`;
		}
		return buttonsHtml;
	}

	generateBookProgressBar(category) {
		//random effect
		const randomPercentage = Math.floor(Math.random() * 101);
		let progressHtml = "";
		if (category.toLowerCase() === "reading") {
			progressHtml = `
                <div class="book-progress">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${randomPercentage}%;">
                            <div class="progress-percent">${randomPercentage}%</div>
                        </div>
                    </div>
                </div>
            `;
		}
		return progressHtml;
	}

	generateEmptyMsg() {
		const msgElement = document.createElement("div");
		msgElement.classList.add("empty-page-message");

		msgElement.innerHTML = `
        <div class="empty-page-container">
            <div class="empty-message">
                <span class="material-symbols-outlined">production_quantity_limits</span>
                <h2>No Books Found</h2>
                <p>It looks like there are no books in your list right now. Why not explore new titles and add them to your collection?</p>
                <button class="go-back-link">All Books</button>
            </div>
        </div>
        `;

		const allBooksBtn = msgElement.querySelector(".go-back-link");

		if (allBooksBtn) {
			allBooksBtn.addEventListener("click", (e) => {
				e.preventDefault();
				this.switchToAllBooksView();
			});
		}

		return msgElement;
	}

	createBookElement(book, category) {
		const bookElement = document.createElement("div");
		bookElement.classList.add("book-item");

		bookElement.innerHTML = `
        <div class="book-card" data-id="${book.id}">
            ${this.generateCloseButton(category)}
            <img src="${book.img}" alt="${book.title}">
            ${this.generateBookProgressBar(category)}
            <div class="content">
                <h3>${book.title}</h3>
                <small>By: ${book.author}</small>
            </div>
          ${this.generateActionButtons(category)}
        </div>
        `;
		return bookElement;
	}

	displayBooks(category) {
		const bookList = this.getBookListByCategory(category);
		const bookListDiv = document.getElementById("bookList");
		bookListDiv.innerHTML = "";

		if (!bookList.length) {
			bookListDiv.classList.remove("double-col-grid");
			bookListDiv.classList.add("single-col-grid");
			bookListDiv.appendChild(this.generateEmptyMsg());
		} else {
			bookListDiv.classList.add("double-col-grid");
		}

		bookList.forEach((book) => {
			const bookElement = this.createBookElement(book, category);
			bookListDiv.appendChild(bookElement);
		});
	}

	snackbar(message = null, bool = true, duration = 3000) {
		if (message === null) message = "";

		const snackbar = document.createElement("div");
		snackbar.classList.add("snackbar");

		if (bool) {
			snackbar.classList.add("success");
			snackbar.innerHTML = `
            ${message}
            <span class="material-symbols-outlined">check_circle</span>
            `;

			document.body.appendChild(snackbar);
			setTimeout(() => {
				snackbar.remove();
			}, duration);
		} else {
			snackbar.classList.add("fail");
			snackbar.innerHTML = `
            ${message}
            <span class="material-symbols-outlined">cancel</span>
            `;

			document.body.appendChild(snackbar);
			setTimeout(() => {
				snackbar.remove();
			}, duration);
		}
	}
}
