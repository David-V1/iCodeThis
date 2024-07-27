class GoalsChart extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.chart = null; // Reference to the chart instance
	}

	static get observedAttributes() {
		return ["data", "labels"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.render();
			this.initializeChart();
		}
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
          height: 300px;
        }
      </style>
      <div class="bg-white rounded-lg shadow p-4 w-full">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Goals</h2>
          <button class="text-gray-500 hover:text-gray-700 flex items-center">
            <span>This Month</span>
            <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" />
            </svg>
          </button>
        </div>
        <div class="chart-container">
          <canvas id="goalsChart"></canvas>
        </div>
      </div>
    `;
	}

	getData() {
		const dataAttr = this.getAttribute("data");
		return dataAttr ? JSON.parse(dataAttr) : [3183, 3846, 1058, 174];
	}

	getLabels() {
		const labelsAttr = this.getAttribute("labels");
		return labelsAttr ? JSON.parse(labelsAttr) : ["Direct", "Organic", "Social", "Referral"];
	}

	initializeChart() {
		const canvas = this.shadowRoot.getElementById("goalsChart");
		if (!canvas) return;

		const ctx = canvas.getContext("2d");

		if (this.chart) {
			this.chart.destroy(); // Destroy previous chart instance if exists
		}

		this.chart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: this.getLabels(),
				datasets: [
					{
						data: this.getData(),
						backgroundColor: ["#06b6d4", "#0f172a", "#9333ea", "#6366f1"],
						borderColor: ["#06b6d4", "#0f172a", "#9333ea", "#6366f1"],
						borderWidth: 1,
						borderRadius: 10,
						barThickness: 20,
						categoryPercentage: 0.5,
						barPercentage: 0.7
					}
				]
			},
			options: {
				indexAxis: "y",
				scales: {
					x: {
						beginAtZero: true,
						ticks: {
							stepSize: 1000
						}
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: true
					}
				},
				elements: {
					bar: {
						borderWidth: 2
					}
				},
				responsive: true,
				maintainAspectRatio: false
			}
		});
	}
}

window.customElements.define("goals-chart", GoalsChart);
