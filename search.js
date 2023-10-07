function filterProducts() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var rows = document.querySelectorAll("#productTableBody tr");

    rows.forEach(function (row) {
        var name = row.querySelector("td:nth-child(2)").innerText.toLowerCase();
        var description = row.querySelector("td:nth-child(3)").innerText.toLowerCase();
        var id =  row.querySelector("td:nth-child(1)").innerText.toLowerCase();
        var price =  row.querySelector("td:nth-child(4)").innerText.toLowerCase();
        if (name.includes(searchInput) || description.includes(searchInput) ||  id.includes(searchInput) ||  price.includes(searchInput)  ) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    });
}


document.getElementById("searchInput").addEventListener("input", filterProducts);
