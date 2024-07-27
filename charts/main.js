const dashboardDateSpan = document.getElementById("dash-date");

function getDashboarDate() {
	const today = new Date();
	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const monthsOfYear = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	const dayOfWeek = daysOfWeek[today.getDay()];
	const month = monthsOfYear[today.getMonth()];
	const day = today.getDate();
	const year = today.getFullYear();

	const daySuffix = (day) => {
		if (day > 3 && day < 21) return "th";
		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	};

	return `${dayOfWeek}, ${month} ${day}${daySuffix(day)}, ${year}`;
}

function updateDashboardDate() {
	dashboardDateSpan.textContent = getDashboarDate();
}

updateDashboardDate();
