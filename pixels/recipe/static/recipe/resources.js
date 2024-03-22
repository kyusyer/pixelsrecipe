document.addEventListener('DOMContentLoaded', () => {
    function updateData(industry) {
        let currentUrl = window.location.href;
        let urlToFetch = currentUrl + "/" + industry;
        console.log(urlToFetch);

        const tbody = document.querySelector('tbody');
        tbody.innerHTML = "Loading data..";
        fetch(urlToFetch)
            .then(response => response.json())
            .then(data => {


                tbody.innerHTML = ""; // Clear existing rows

                const products = data.products;
                for (let i = 0; i < products.length; i++) {
                    const product = products[i];

                    const tr = document.createElement("tr");

                    const tdName = document.createElement("td");
                    tdName.textContent = product.name;


                    const tdEnergy = document.createElement("td");
                    tdEnergy.textContent = product.energy_needed;
                    console.log(product.energy)

                    const tdPrice = document.createElement("td");
                    tdPrice.textContent = product.market_price;

                    const tdProfit = document.createElement("td");
                    tdProfit.textContent = product.profit;

                    const tdPE = document.createElement("td");
                    tdPE.textContent = product.pe;

                    tr.appendChild(tdName);
                    tr.appendChild(tdEnergy);
                    tr.appendChild(tdPrice);
                    tr.appendChild(tdProfit);
                    tr.appendChild(tdPE);

                    tbody.appendChild(tr);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    document.querySelector(".industry").style.backgroundColor = "Gray";

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains("industry")) {
            document.querySelectorAll(".industry").forEach(industry => {
                industry.style.backgroundColor = "Green";
            });

            event.target.style.backgroundColor = "Gray";
            let industry = event.target.innerHTML;
            updateData(industry);
        }
    });
});
