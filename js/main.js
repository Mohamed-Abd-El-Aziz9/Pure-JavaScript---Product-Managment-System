var ProductNameInput = document.getElementById("ProductNameInput");
var ProductPriceInput = document.getElementById("ProductPriceInput");
var ProductCategoryInput = document.getElementById("ProductCategoryInput");
var ProductDescriptionInput = document.getElementById("ProductDescriptionInput");
var ProductDetails = [];
var searchBox = document.getElementById("searchInput");
var addProductButton = document.getElementById("addButton")
var updateProductButton = document.getElementById("updateButton")
if (localStorage.getItem("list") != null) {
    ProductDetails = JSON.parse(localStorage.getItem("list"));
    displayProduct();
} else {
    ProductDetails = []
}
function addProduct() {


    if (validationProductName() == true) {
        var Product = {
            ProductName: ProductNameInput.value,
            ProductPrice: ProductPriceInput.value,
            ProductCategory: ProductCategoryInput.value,
            ProducrDescription: ProductDescriptionInput.value
        }
        ProductDetails.push(Product);
        localStorage.setItem("list", JSON.stringify(ProductDetails));
        displayProduct(ProductDetails);
    }
    else {
        alert("Product name invalid");
    }

}

function clearForm() {
    ProductNameInput.value = "",
        ProductPriceInput.value = "",
        ProductCategoryInput.value = "",
        ProductDescriptionInput.value = ""
};

function displayProduct() {
    var container = ``;
    for (var i = 0; i < ProductDetails.length; i++) {
        container +=
            `<tr>
        <td>${i}</td>
        <td>${ProductDetails[i].ProductName}</td>
        <td>${ProductDetails[i].ProductPrice}</td>
        <td>${ProductDetails[i].ProductCategory}</td>
        <td>${ProductDetails[i].ProducrDescription}</td>
        <td><button onclick =" UpdateItem(${i}) " class="bnt btn-warning btn-sm">Update</button></td>
        <td><button onclick =" deleteProduct(${i}) " class="bnt btn-danger btn-sm">Delete</button></td>
        </tr>`  ;
    }

    document.getElementById('tableBody').innerHTML = container;
};
function search() {
    var temp = "";

    for (var i = 0; i < ProductDetails.length; i++) {
        if (
            ProductDetails[i].ProductName.toLowerCase().includes(searchBox.value.toLowerCase())

            ||
            ProductDetails[i].ProductCategory.toLowerCase().includes(searchBox.value.toLowerCase())

        ) {
            temp +=
                `<tr>
    <td>${i}</td>
    <td>${ProductDetails[i].ProductName} </td>
    <td>${ProductDetails[i].ProductPrice}</td>
    <td>${ProductDetails[i].ProductCategory}</td>
    <td>${ProductDetails[i].ProducrDescription}</td>
    <td><button class="bnt btn-warning btn-sm">Update</button></td>
    <td><button class="bnt btn-danger btn-sm">Delete</button></td>
    </tr>`
        }
    }
    document.getElementById('tableBody').innerHTML = temp;
}


function deleteProduct(index) {
    ProductDetails.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(ProductDetails));
    displayProduct();
}

var index
function UpdateItem(updatedIndex) {
    ProductNameInput.value = ProductDetails[updatedIndex].ProductName,
        ProductPriceInput.value = ProductDetails[updatedIndex].ProductPrice,
        ProductCategoryInput.value = ProductDetails[updatedIndex].ProductCategory,
        ProductDescriptionInput.value = ProductDetails[updatedIndex].ProducrDescription
    addProductButton.classList.add("d-none");
    updateProductButton.classList.remove("d-none");
    index = updatedIndex;

}

function SubmitUpdatedItem() {
    ProductDetails[index].ProductName = ProductNameInput.value;
    ProductDetails[index].ProductPrice = ProductPriceInput.value;
    ProductDetails[index].ProductCategory = ProductCategoryInput.value;
    ProductDetails[index].ProducrDescription = ProductDescriptionInput.value;
    localStorage.setItem("list", JSON.stringify(ProductDetails));
    displayProduct();

}
function validationProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(ProductNameInput.value) == true) {
        ProductNameInput.classList.remove('is-invalid')
        ProductNameInput.classList.add('is-valid')
        return true
    }
    else {
        ProductNameInput.classList.remove('is-valid')
        ProductNameInput.classList.add('is-invalid')
        return false;
    }
}
function validationCategorytName() {
    var regex = /()/g;
    if (regex.test(ProductCategoryInput.value) == true) {
        ProductCategoryInput.classList.remove('is-invalid')
        ProductCategoryInput.classList.add('is-valid')
        return true
    }
    else {
        ProductCategoryInput.classList.remove('is-valid')
        ProductCategoryInput.classList.add('is-invalid')
        return false
    }
}

