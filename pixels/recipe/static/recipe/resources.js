

async function updateEnergy() {


    const updateButton = document.querySelector("#update-now");
    var origText = updateButton.textContent
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
    updateButton.style.backgroundColor = "yellow";
    updateButton.textContent = origText;


}


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





document.addEventListener('DOMContentLoaded', () => {
    const energyPath = "/recipe/energy"
    const industryPath = "/recipe/industry"

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


