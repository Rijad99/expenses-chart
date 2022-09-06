const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

// Get the data

fetch("../../data.json")
    .then(res => res.json())
    .then(data => drawCharts(data))



// UI

const drawCharts = (data) => {
    const chartsContainer = document.getElementById("charts")
    const totalThisMonth = document.getElementById("total-this-month")

    const total = data
        .map(d => d.amount)
        .reduce((acc, currentValue) => acc += currentValue)

    totalThisMonth.innerText = `$${total}`

    data.forEach(d => {
        const chart = document.createElement("li")

        const currentDay = new Date().getDay()

        chart.className = `chart ${d.amount < 50 ? "soft-red" : "cyan"} ${d.day === days[currentDay - 1] ? "current-day" : ""}`
        chart.style.height = `${d.amount * 2.5}px`

        chart.innerHTML = `
            <div class="tooltip">$${d.amount}</div>
            <span class="day">${d.day}</span>
        `

        chartsContainer.appendChild(chart)
    });
}