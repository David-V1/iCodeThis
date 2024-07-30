class RadarChart extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.chart = null;
	}

	static get observedAttributes() {
		return ["data", "labels"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.updateChart();
		}
	}

	connectedCallback() {
		this.render();
		this.initializeChart();
	}

	disconnectedCallback() {
		if (this.chart) {
			this.chart.destroy();
		}
	}

	render() {
		this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
      <div class="bg-white rounded-lg shadow p-4 w-full h-full">
        <h2 class="text-lg font-semibold">Health Assessment</h2>
        <div class="chart-container w-full h-full">
          <canvas id="radarChart" class="w-auto h-auto"></canvas>
        </div>
      </div>
    `;
	}

	getData() {
		const dataAttr = this.getAttribute("data");
		return dataAttr ? JSON.parse(dataAttr) : [65, 59, 90, 81, 56, 55];
	}

	getLabels() {
		const labelsAttr = this.getAttribute("labels");
		return labelsAttr ? JSON.parse(labelsAttr) : ["Strength", "Speed", "Endurance", "Agility", "Flexibility", "Skill"];
	}

	getDatasetLabel() {
		return this.getAttribute("datasetLabel") || "Dataset A";
	}
	initializeChart() {
		const canvas = this.shadowRoot.getElementById("radarChart");
		const ctx = canvas.getContext("2d");
		this.chart = new Chart(ctx, {
			type: "radar",
			data: {
				labels: this.getLabels(),
				datasets: [
					{
						label: this.getDatasetLabel(),
						backgroundColor: "#9966cc",
						borderColor: "#5d3a99",
						pointBackgroundColor: "#89c2d9",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgba(255, 99, 132, 1)",
						data: this.getData()
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					r: {
						angleLines: {
							display: true
						},
						suggestedMin: 0,
						suggestedMax: 100
					}
				},
				plugins: {
					legend: {
						position: "top"
					},
					title: {
						display: true,
						text: "Athlete Performance Comparison"
					}
				}
			}
		});
	}

	updateChart() {
		if (this.chart) {
			this.chart.data.labels = this.getLabels();
			this.chart.data.datasets[0].data = this.getData();
			this.chart.update();
		} else {
			this.initializeChart();
		}
	}
}

window.customElements.define("radar-chart", RadarChart);
