// Cart
let cartIcon = document.querySelector("#cart-icon");
let cartB = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
closeCart.onclick = () => {
  cartB.classList.add("active");
};
// Close Cart
cartIcon.onclick = () => {
  cartB.classList.remove("active");
};

// Define the products
const product1 = {
  name: "BBC micro:bit",
  price: 1500,
  image: "../../static/img/BBCmicrobit.jpg",
};

const product2 = {
  name: "Arduino Uno R3",
  price: 600,
  image: "../../static/img/ArduinoUnoR3.jpg",
};

// Get the cart element
const cart = document.querySelector(".cart-content");

// Add the first product to the cart
const product1Box = createProductBox(product1);
cart.appendChild(product1Box);

// Add the second product to the cart
const product2Box = createProductBox(product2);
cart.appendChild(product2Box);

function createProductBox(product) {
  // Create the product box element
  const box = document.createElement("div");
  box.classList.add("cart-box");

  // Add the product image
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.classList.add("cart-img");
  box.appendChild(img);

  // Add the product details
  const detailBox = document.createElement("div");
  detailBox.classList.add("detail-box");

  const title = document.createElement("div");
  title.classList.add("cart-product-title");
  title.textContent = product.name;
  detailBox.appendChild(title);

  const price = document.createElement("div");
  price.classList.add("cart-price");
  price.textContent = `$${product.price}`;
  detailBox.appendChild(price);

  const quantity = document.createElement("input");
  quantity.type = "number";
  quantity.value = 1;
  quantity.classList.add("cart-quantity");
  detailBox.appendChild(quantity);

  box.appendChild(detailBox);

  // Add the remove button
  const removeButton = document.createElement("p");
  removeButton.classList.add("cart-remove");
  removeButton.textContent = "Delete";
  box.appendChild(removeButton);

  // Add the remove event listener
  removeButton.addEventListener("click", removeCartItem);

  // Add the quantity event listener
  quantity.addEventListener("change", quantityChanged);

  return box;
}

let sAdd = document.querySelector("#s-add");
let form = document.querySelector(".form");

sAdd.onclick = () => {
  form.classList.remove("form");
  form.classList.add("show");
};

// Cart Workeing JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function
function ready() {
  // remove Items from Cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var buttons = removeCartButtons[i];
    buttons.addEventListener("click", removeCartItem);
  }
  // Quantity Changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Buy Button Work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// Buy Button

function buyButtonClicked() {
  // Get the selected address from the radio buttons
  let selectedAddress = document.querySelector(
    'input[name="address"]:checked'
  ).value;

  // Store the selected address in local storage
  localStorage.setItem("address", selectedAddress);

  // Prompt the user to enter their credit card details
  var cardNumber = prompt("Please enter your 16-digit credit card number:");
  var cardName = prompt("Please enter the name on your credit card:");
  var cardExpiry = prompt(
    "Please enter the expiration date of your credit card (MM/YY):"
  );
  var cardCvv = prompt("Please enter the CVV code on your credit card:");

  // Validate the credit card details
  if (cardNumber.length !== 16 || isNaN(cardNumber)) {
    alert(
      "Invalid credit card number. Please enter a valid 16-digit credit card number."
    );
    return 0;
  } else if (cardName.length === 0) {
    alert(
      "Invalid name on credit card. Please enter a valid name on your credit card."
    );
    return 0;
  } else if (cardExpiry.length !== 5 || !cardExpiry.match(/^\d{2}\/\d{2}$/)) {
    alert(
      "Invalid expiration date. Please enter a valid expiration date in the format MM/YY."
    );
    return 0;
  } else if (cardCvv.length !== 3 || isNaN(cardCvv)) {
    alert("Invalid CVV code. Please enter a valid 3-digit CVV code.");
    return 0;
  } else {
    // Credit card details are valid, do something with them here
    alert(
      "Card Number: " +
        cardNumber +
        "\nCard Name: " +
        cardName +
        "\nCard Expiry: " +
        cardExpiry +
        "\nCard CVV: " +
        cardCvv
    );
  }

  // Remove items from cart
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  // Alert user that their order has been placed and which address was selected
  alert("Your order has been placed using address: " + selectedAddress);
  // Alert user that their order has been placed and which address was selected
  alert("Your order has been placed successfully");
}

function removeCartItem(event) {
  const removeButton = event.target;
  removeButton.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    const box = cartBoxes[i];
    const priceElement = box.querySelector(".cart-price");
    const quantityElement = box.querySelector(".cart-quantity");
    const price = parseFloat(priceElement.textContent.replace("$", ""));
    const quantity = quantityElement.value;
    total += price * quantity;
  }
  const totalElement = document.querySelector(".total-price");
  totalElement.textContent = `$${total}`;
}
