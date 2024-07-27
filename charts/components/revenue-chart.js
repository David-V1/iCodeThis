class RevenueChart extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.chart = null; // Reference to the chart instance
	}

	connectedCallback() {
		this.render();
		this.initializeChart();
	}

	render() {
		this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
      <style>
        .chart-container {
          position: relative;
          width: 100%;
          height: 400px; /* Set a fixed height for the chart */
        }
      </style>
      <div class="bg-white rounded-lg shadow p-4 w-full h-full max-w-4xl">
        <h2 class="text-lg font-semibold">Revenue </h2>
        <div class="chart-container">
          <canvas id="verticalBarChart"></canvas>
        </div>
      </div>
    `;
	}

	initializeChart() {
		const canvas = this.shadowRoot.getElementById("verticalBarChart");
		const ctx = canvas.getContext("2d");
		new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [
					{
						label: "Sales 2023",
						backgroundColor: "rgba(255, 99, 132, 0.5)",
						borderColor: "rgba(255, 99, 132, 1)",
						borderWidth: 1,
						data: [5000, 7000, 8000, 6000, 7500, 9000, 6500]
					},
					{
						label: "Sales 2022",
						backgroundColor: "rgba(54, 162, 235, 0.5)",
						borderColor: "rgba(54, 162, 235, 1)",
						borderWidth: 1,
						data: [4500, 6800, 7800, 5600, 7200, 8700, 6300]
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true
					}
				},
				plugins: {
					legend: {
						display: true,
						position: "top"
					},
					title: {
						display: true,
						text: "Dave's Revenue Chart"
					}
				}
			}
		});
	}
}

window.customElements.define("revenue-chart", RevenueChart);
