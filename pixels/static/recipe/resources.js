

async function updateEnergy() {
    /// updates the data on energy page and sort it from highest to lowest..
    const updateButton = document.querySelector("#update-now");
    let origText = updateButton.textContent
    let origBGColor = updateButton.style.color;
    updateButton.style.backgroundColor = "Gray";
    updateButton.textContent = "Updating...";

    var unsortedTable = []

    var elTableRows = document.querySelectorAll(".energy-item-data");
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "Fetching data.........";

    // elTableRows.forEach(row => {
    // forEach can only be used in arrays, nodelist need to be converted to array first.. better use for..of


    for (const row of elTableRows) {

        const name = row.querySelector("td:first-child").textContent;
        console.log(name);
        const energyGain = row.querySelector("td:nth-child(2)").textContent;

        try {

            const response = await fetch(`item/${name}`);
            const price = await response.text();
            const coinsPerEnergy = +price / +energyGain;

            const rowData = {
                name, // shorthand of writing name: name in js, 
                energyGain,
                price,
                CoinEnergy: coinsPerEnergy.toFixed(2)
            };

            unsortedTable.push(rowData);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }



    const sortedTable = unsortedTable.sort((prev, next) => +prev.CoinEnergy - +next.CoinEnergy)

    tableBody.innerHTML = "";
    sortedTable.forEach((rowData) => {

        const trow = document.createElement("tr");
        trow.className = "energy-item-data";
        trow.innerHTML = `
        <td>${rowData.name}</td>
        <td>${rowData.energyGain}</td>
        <td>${rowData.price}</td>
        <td>${rowData.CoinEnergy}</td>    
        `;


        // console.log(trow.innerHTML);
        tableBody.append(trow);

    })
    updateButton.style.backgroundColor = origBGColor;
    updateButton.textContent = origText;

}


function updateData(industry) {
    let currentUrl = window.location.href;
    let urlToFetch = currentUrl + "/" + industry;
    // console.log(urlToFetch);

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = "Loading data..";

    var localRequirement = JSON.parse(localStorage.getItem("itemReq"));
    // console.log(localRequirement)
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
                let energy_needed = localRequirement[product.name]["required_energy"]
                // console.log(energy_needed)

                tdEnergy.textContent = energy_needed;

                const tdPrice = document.createElement("td");
                tdPrice.textContent = product.market_price;

                const tdProfit = document.createElement("td");

                let cost = localRequirement[product.name]["capital"]

                let profit = Math.floor((product.market_price * 0.99 - cost));
                tdProfit.textContent = profit;

                const tdPE = document.createElement("td");
                let out = localRequirement[product.name]["out"]
                let pe = (profit / energy_needed) * out;
                tdPE.textContent = pe.toFixed(2);

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





document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener("click", (event) => {


        if (event.target.classList.contains("burger")) {

            let elNavBar = document.querySelector(".nav-container");
            if (elNavBar.style.display === "none" || elNavBar.style.display === "") {
                elNavBar.style.display = "flex";
            }
            else {
                elNavBar.style.display = "none";
            }

        }
    })
    const energyPath = "/recipe/energy"
    const industryPath = "/recipe/resources"

    var currentPath = window.location.pathname;

    console.log(currentPath)

    if (currentPath === energyPath) {




        updateEnergy();

        const updateButton = document.querySelector("#update-now");
        updateButton.onclick = function (event) {
            event.stopPropagation();
            updateEnergy();

        }

    }


    if (currentPath === industryPath) {
        const origBG = document.querySelector(".industry:last-child").style.backgroundColor;


        document.querySelector(".industry:first-child").style.backgroundColor = "Gray";

        if (!localStorage.getItem("requirement")) {
            // let currHost = window.location.host;

            // let urlToFetch = currHost+"/recipe/requirement"
            fetch("/recipe/requirement")
                .then(response => response.json())
                .then(text => {
                    localStorage.setItem("itemReq", JSON.stringify(text));
                    // console.log("saved")

                })
        }



        updateData("Farming");
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains("industry")) {

                document.querySelectorAll(".industry").forEach(industry => {
                    industry.style.backgroundColor = origBG;
                });

                event.target.style.backgroundColor = "Gray";
                let industry = event.target.innerHTML;
                updateData(industry);
            }
        });

    }


});


// function sortNodes(myNodeList) {
//     // [1,2,3]

//     var sortedNodeList = [];

//     while (myNodeList.length > 1) {
//         let smallestIndex = 0;
//         let smallestValue = Infinity;


//         for (let i = 1; i < myNodeList.length; i++) {

//             smallestValue = Number(myNodeList[smallestIndex].querySelector("td:last-child").textContent);
//             let currValue = Number(myNodeList[i].querySelector("td:last-child").textContent);

//             if (currValue < smallestValue) {

//                 smallestIndex = i;


//             }



//         }
//         sortedNodeList.push(myNodeList[smallestIndex])

//         myNodeList[0].parentNode.removeChild[smallestIndex]


//     }
//     sortedNodeList.push(myNodeList[0])
//     myNodeList[0].parentNode.removeChild[0]



//     sortedNodeList.forEach(node => {

//         document.querySelector("tbody").appendChild(node);

//     }

//     )
// }


