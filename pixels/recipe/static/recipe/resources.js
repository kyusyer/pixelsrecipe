document.addEventListener('DOMContentLoaded', () => {



    function updateData (industry){

        console.log(industry)

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





    }});
    


















}
)