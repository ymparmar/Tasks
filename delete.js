
  displayProducts();

  function closeModal() {
    // Find the modal element by its ID
    var modal = document.getElementById("exampleModal");

    // Create a Bootstrap modal instance
    var modalInstance = new bootstrap.Modal(modal);

    // Close the modal
    modalInstance.closeModal();
  }

  function displayProducts() {
    var products = JSON.parse(localStorage.getItem("products")) || [];

    var tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = ""; // Clear the table

    if (products.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='6'>No products available.</td></tr>";
    } else {

        products.forEach(function (product) {
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${product.price}</td>
          <td><img src="${product.image}" style="max-width: 100px;"></td>
          <td>
            <button type="button" class="btn btn-primary" onclick="editProduct(${product.id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        `;
        tableBody.appendChild(newRow);
      });
    }
  }


function saveChanges() {
    if (editingProductId !== null) {

        var updatedName = document.getElementById("inputitemname").value;
        var updatedDescription = document.getElementById("inputDescription").value;
        var updatedPrice = document.getElementById("inputPrice").value;
        // var updatedPrice = document.getElementById("inputImage").value;

        var products = JSON.parse(localStorage.getItem("products")) || [];


        var productToEdit = products.find(function (product) {
            return product.id === editingProductId;
        });

        if (productToEdit) {

            productToEdit.name = updatedName;
            productToEdit.description = updatedDescription;
            productToEdit.price = updatedPrice;
            // productToEdit.image = updatedimage;


            localStorage.setItem("products", JSON.stringify(products));


            document.getElementById("inputitemname").value = "";
            document.getElementById("inputDescription").value = "";
            document.getElementById("inputPrice").value = "";
            // document.getElementById("inputImage").value = "";
            editingProductId = null;


           
            // const modal = document.getElementById('exampleModal')
            // myModalEl.addEventListener('hidden.bs.modal', event => {
            //   // do something...
            // })


            displayProducts();
        }
    }
}


function editProduct(productId) {
    var products = JSON.parse(localStorage.getItem("products")) || [];

    // Find the product with the specified ID
    var product = products.find(function (product) {
        return product.id === productId;
    });

    if (product) {
        // Set the editingProductId variable to the ID of the product being edited
        editingProductId = productId;

        // Fill the modal inputs with the product's data
        document.getElementById("inputitemname").value = product.name;
        document.getElementById("inputDescription").value = product.description;
        document.getElementById("inputPrice").value = product.price;
        // document.getElementById("inputImage").value = product.image;

        // Show the modal
        var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();

        // Show the "Update Product" button and hide the "AddProduct" button
        document.getElementById("updateProductButton").style.display = "block";
        document.getElementById("addProductButton").style.display = "none";
    }
}

// Function to update a product
function updateProduct() {
    if (editingProductId !== null) {
        // Get the updated values from the modal inputs
        var updatedName = document.getElementById("inputitemname").value;
        var updatedDescription = document.getElementById("inputDescription").value;
        var updatedPrice = document.getElementById("inputPrice").value;
        // var updatedPrice = document.getElementById("inputImage").value;

        var products = JSON.parse(localStorage.getItem("products")) || [];

        // Find the product to edit by its ID
        var productToEdit = products.find(function (product) {
            return product.id === editingProductId;
        });

        if (productToEdit) {
            // Update the product's data
            productToEdit.name = updatedName;
            productToEdit.description = updatedDescription;
            productToEdit.price = updatedPrice;
            // productToEdit.image = updatedimage;

            // Save the updated data back to local storage
            localStorage.setItem("products", JSON.stringify(products));

            // Clear the modal inputs and reset the editingProductId
            document.getElementById("inputitemname").value = "";
            document.getElementById("inputDescription").value = "";
            document.getElementById("inputPrice").value = "";
            // document.getElementById("inputImage").value = "";

            editingProductId = null;


               // Refresh the product list
               displayProducts();
            // Close the modal
            

            const modal = document.getElementById('exampleModal')
            myModalEl.addEventListener('hidden.bs.modal', event => {
              // do something...
            })

            // Hide the "Update Product" button and show the "AddProduct" button
            document.getElementById("updateProductButton").style.display = "none";
            document.getElementById("addProductButton").style.display = "block";

            // // Refresh the product list
            // displayProducts();
        }
    }
}

// Function to delete a product by ID and remove the corresponding row
function deleteProduct(productId) {
    var products = JSON.parse(localStorage.getItem("products")) || [];

    // Find the index of the product with the specified ID
    var index = products.findIndex(function (product) {
        return product.id === productId;
    });

    if (index !== -1) {
        // Remove the product from the array
        products.splice(index, 1);

        // Save the updated data back to local storage
        localStorage.setItem("products", JSON.stringify(products));

        // Remove the corresponding row from the table
        var tableBody = document.getElementById("productTableBody");
        tableBody.deleteRow(index); // Delete the row at the specified index

        // If all rows were deleted, display a message
        if (products.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='6'>No products available.</td></tr>";
        }
    }
}



