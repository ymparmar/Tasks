  // Initialize editingProductId variable
var editingProductId = null;

function addProduct() {
  // Get the values from the input fields
  var itemName = document.getElementById("inputitemname").value;
  var description = document.getElementById("inputDescription").value;
  var price = document.getElementById("inputPrice").value;
  var imageInput = document.getElementById("inputImage");

  if (itemName === "" || description === "" || price === " " || imageInput === "") {
    alert("Please fill in all the fields");
    return;
  }

  var imageBase64 = ""; // Initialize the image data as an empty string

  // Check if an image is selected
  if (imageInput.files.length > 0) {
    var reader = new FileReader();

    reader.onload = function (e) {
      // Store the Base64-encoded image data
      imageBase64 = e.target.result;

      // Continue with adding the product
      continueAddingProduct(itemName, description, price, imageBase64);
    };

    // Read the selected image as a Data URL (Base64)
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // No image selected, continue adding the product without an image
    continueAddingProduct(itemName, description, price, imageBase64);
  }
}

// Function to continue adding the product after image processing
function continueAddingProduct(itemName, description, price, imageBase64) {
  // Check if there's existing data in local storage
  var products = JSON.parse(localStorage.getItem("products")) || [];

  // Calculate the ID based on the number of existing products
  var newProductId = products.length + 1;

  // Create an object to represent the product
  var product = {
    id: newProductId,
    name: itemName,
    description: description,
    price: price,
    image: imageBase64, // Store the Base64-encoded image data
  };

  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));

  document.getElementById("inputitemname").value = "";
  document.getElementById("inputDescription").value = "";
  document.getElementById("inputPrice").value = "";
  document.getElementById("inputImage").value = "";

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

  document.getElementById("productTableBody").appendChild(newRow);



  const modal = document.getElementById('exampleModal')
myModalEl.addEventListener('hidden.bs.modal', event => {
})

  // Display a toast to indicate that the product was added
  additemtoast();
}

// Function to edit a product
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

    // Show the modal
    var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();

    // Show the "Update Product" button and hide the "AddProduct" button
    document.getElementById("updateProductButton").style.display = "block";
    document.getElementById("addProductButton").style.display = "none";
  }
}