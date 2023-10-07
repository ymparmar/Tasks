document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("productTable");
    var tbody = document.getElementById("productTableBody");

    var idHeader = document.getElementById("id");
    var nameHeader = document.getElementById("name");
    var priceHeader = document.getElementById("Price");

    
    var idSortOrder = 1; //
    var rows = Array.from(tbody.querySelectorAll("tr"));

    function sortTable(columnId) {
        rows.sort(function (a, b) {
            var aValue = a.querySelector("td:nth-child(" + (columnId + 1) + ")").textContent;
            var bValue = b.querySelector("td:nth-child(" + (columnId + 1) + ")").textContent;

            if (columnId === 0 || columnId === 2) {
                return aValue.localeCompare(bValue) * idSortOrder;
            } else {
                return (parseFloat(aValue) - parseFloat(bValue)) * idSortOrder;
            }
        });

        tbody.innerHTML = "";
        rows.forEach(function (row) {
            tbody.appendChild(row);
        });

        idSortOrder *= -1;
    }

    idHeader.addEventListener("click", function () {
        console.log("===")
        sortTable(0);
    });
        const th = table.querySelector("#name");
      
        let sortOrder = th.getAttribute("data-sort-order"); // Initialize sorting order
      
        th.addEventListener("click", function () {
          const rows = Array.from(table.querySelectorAll("tbody tr"));
      
          rows.sort((a, b) => {
            const aValue = a.querySelector("td").textContent;
            const bValue = b.querySelector("td").textContent;
            if (sortOrder === "asc") {
              return bValue.localeCompare(aValue);
            } else {
              return aValue.localeCompare(bValue);
            }
          });
      
          // Toggle sorting order
          sortOrder = sortOrder === "asc" ? "desc" : "asc";
          th.setAttribute("data-sort-order", sortOrder);
      
          // Remove existing rows
          rows.forEach(row => row.remove());
      
          // Append sorted rows
          rows.forEach(row => table.querySelector("tbody").appendChild(row));
        });

    

    priceHeader.addEventListener("click", function () {
        sortTable(2);
    });

});


  