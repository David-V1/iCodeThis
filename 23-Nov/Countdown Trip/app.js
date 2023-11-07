function editDate() {
	const edit = document.querySelector("#edit-icon");
	const datePicker = document.querySelector("#start");
	edit.addEventListener("click", () => {
		if (datePicker.style.display === "block") {
			datePicker.style.display = "none";
		} else {
			datePicker.style.display = "block";
		}
	});
}

editDate();

function getCountdownDate() {
	const dateElement = document.querySelector(".title h3");

	const dateString = dateElement.textContent;

	const dateParts = dateString.split(" ");

	const date = dateParts[1];
	const month = dateParts[2];
	const year = dateParts[3];
	const countdownDate = new Date(`${month} ${date}, ${year}`);

	return countdownDate.getTime();
}

function pad(number) {
	return number < 10 ? "0" + number : number;
}
//TODO: single dt
const x = setInterval(function () {
	const day = document.querySelector("#day");
	const hour = document.querySelector("#hour");
	const minute = document.querySelector("#minute");
	const second = document.querySelector("#second");
	const now = new Date().getTime();
	const distance = getCountdownDate() - now;

	if (distance < 0) {
		clearInterval(x);
		day.innerHTML = "00";
		hour.innerHTML = "00";
		minute.innerHTML = "00";
		second.innerHTML = "00";
		document.querySelector(".title h3").innerHTML = "EXPIRED";
	}

	let days = Math.floor(distance / (1000 * 60 * 60 * 24));
	if (days < 0) {
		day.innerHTML = days + 1;
	} else {
		day.innerHTML = pad(days);
	}
	let hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	if (hours < 0) {
		hour.innerHTML = hours + 24;
	} else {
		hour.innerHTML = pad(hours);
	}
	hour.innerHTML = pad(hours);
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	if (minutes < 0) {
		minute.innerHTML = minutes + 60;
	} else {
		minute.innerHTML = pad(minutes);
	}
	let seconds = Math.floor((distance % (1000 * 60)) / 1000);
	if (seconds < 0) {
		second.innerHTML = seconds + 60;
	} else {
		second.innerHTML = pad(seconds);
	}
}, 1000);

function formatDate(date) {
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	};
	return date.toLocaleDateString("en-US", options);
}

document.addEventListener("DOMContentLoaded", () => {
	const dateInput = document.getElementById("start");
	const dateDisplay = document.querySelector(".title h3");

	dateInput.addEventListener("change", () => {
		const selectedDate = new Date(dateInput.value);
		dateDisplay.textContent = formatDate(selectedDate);
		const datePicker = document.querySelector("#start");
		datePicker.style.display = "none";
	});
});
