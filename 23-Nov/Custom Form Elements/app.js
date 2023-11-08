function createBubble() {
	const bubbleContainer = document.querySelector(".bubble-container");
	const bubbleEl = document.createElement("div");

	bubbleEl.classList.add("bubble");
	bubbleEl.style.width = `${Math.random() * 250 + 3}px`;
	bubbleEl.style.height = bubbleEl.style.width;
	bubbleEl.style.left = `${Math.random() * 80}%`;

	bubbleEl.style.animation = `rise ${
		Math.random() * 10 + 10
	}s linear infinite`;

	bubbleContainer.appendChild(bubbleEl);

	bubbleEl.addEventListener("animationend", function () {
		bubbleEl.remove();
	});
}
setInterval(createBubble, 800);

function rateExperience() {
	const ratingOptions = document.querySelectorAll(
		".r__experience-rating span"
	);

	ratingOptions.forEach((rating) => {
		rating.addEventListener("click", () => {
			ratingOptions.forEach((r) => {
				r.classList.remove("selected");
			});
			rating.classList.add("selected");
		});
	});
}
rateExperience();

function rateService() {
	const stars = document.querySelectorAll(".star-rating i");

	stars.forEach((star, i) => {
		star.addEventListener("click", () => {
			for (let j = 0; j <= stars.length; j++) {
				if (j <= i) {
					stars[j].classList.add("bi-star-fill");
					stars[j].classList.remove("bi-star");
				} else {
					stars[j].classList.add("bi-star");
					stars[j].classList.remove("bi-star-fill");
				}
			}
		});
	});
}
rateService();

function checked() {
	const checkBoxes = document.querySelectorAll(".checkmark");

	checkBoxes.forEach((checkBox) => {
		checkBox.addEventListener("click", () => {
			checkBox.classList.toggle("checked");
		});
	});
}
checked();

function progressTracker() {
	const icons = document.querySelectorAll(".icon i");

	icons.forEach((icon) => {
		icon.addEventListener("click", () => {
			let parentDiv = icon.parentElement;

			if (icon.classList[1] === "bi-record-circle-fill") {
				icon.classList.remove("bi-record-circle-fill");
				icon.classList.add("bi-check-circle-fill");
				parentDiv.classList.remove("active");
				parentDiv.classList.add("done");
			} else if (icon.classList[1] === "bi-check-circle-fill") {
				icon.classList.remove("bi-check-circle-fill");
				icon.classList.add("bi-record-circle-fill");
				parentDiv.classList.add("active");
			} else if (icon.classList[1] === "bi-record-fill") {
				icon.classList.remove("bi-record-fill");
				icon.classList.add("bi-record-circle-fill");
				parentDiv.classList.add("active");
			}
		});
	});
}

progressTracker();
