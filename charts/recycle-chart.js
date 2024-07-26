class RecycleChart extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
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
		const data = this.getData();
		const labels = this.getLabels();
		const colors = ["bg-black", "bg-yellow-500", "bg-red-500", "bg-pink-500", "bg-blue-500", "bg-green-500"];

		const listItems = labels
			.map(
				(label, index) => `
      <li class="flex items-center justify-between text-sm mb-1">
        <span class="flex items-center">
          <span class="w-3 h-3 rounded-full ${colors[index % colors.length]} mr-2"></span>
          ${label}
        </span>
        <span>${data[index] ? data[index] + "%" : "N/A"}</span>
      </li>
    `
			)
			.join("");

		this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
      <div class="bg-white rounded-lg shadow p-4 w-80">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Recycled</h2>
          <button class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 6.75c.414 0 .75.336.75.75v10.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75V7.5c0-.414.336-.75.75-.75zm-4.5 4.5c.414 0 .75.336.75.75v5.25c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-5.25c0-.414.336-.75.75-.75zm9 0c.414 0 .75.336.75.75v5.25c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-5.25c0-.414.336-.75.75-.75z"
              ></path>
            </svg>
          </button>
        </div>
        <div class="flex items-center justify-center">
          <canvas id="recycledChart" width="200" height="200"></canvas>
        </div>
        <div class="mt-4">
          <ul>
            ${listItems}
          </ul>
        </div>
        <button class="mt-8 border border-gray-300 text-gray-400 hover:bg-gray-200 hover:text-white font-semibold py-2 px-4 rounded w-full">
          View More
        </button>
      </div>
    `;
	}

	getData() {
		const dataAttr = this.getAttribute("data");
		return dataAttr ? JSON.parse(dataAttr) : [32, 25, 22, 21, 7];
	}

	getLabels() {
		const labelsAttr = this.getAttribute("labels");
		return labelsAttr ? JSON.parse(labelsAttr) : ["Text", "Images", "Documents", "Videos", "Others"];
	}

	initializeChart() {
		const ctx = this.shadowRoot.getElementById("recycledChart").getContext("2d");
		new Chart(ctx, {
			type: "doughnut",
			data: {
				datasets: [
					{
						data: this.getData(),
						backgroundColor: ["#1F2937", "#EAB308", "#DC2626", "#BE185D", "#2563EB", "#059669", "#FB923C", "#FACC15"],
						hoverBackgroundColor: [
							"#000000",
							"#FBBF24",
							"#EF4444",
							"#EC4899",
							"#3B82F6",
							"#10B981",
							"#F87171",
							"#FBBF24"
						]
					}
				],
				labels: this.getLabels()
			},
			options: {
				cutoutPercentage: 70,
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: false
					}
				}
			}
		});
	}
}

window.customElements.define("recycle-chart", RecycleChart);
