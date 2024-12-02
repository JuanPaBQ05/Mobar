let productQuantity = 1;

const quantityBadge = document.getElementById("var-value");
const kartBadge = document.querySelector(".kart-badge");
const successMessage = document.getElementById("success-message");
const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const addToCartForm = document.getElementById("add-to-cart-form");

btnPlus.addEventListener("click", () => {
    productQuantity++;
    updateQuantityDisplay();
});

btnMinus.addEventListener("click", () => {
    if (productQuantity > 1) {
        productQuantity--;
        updateQuantityDisplay();
    }
});

function updateQuantityDisplay() {
    quantityBadge.textContent = productQuantity;
}

document.getElementById("add-to-cart-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const productName = document.getElementById("product-name").textContent;
    const productPrice = document.getElementById("product-price").textContent.replace("₡", "").trim();
    const productColor = document.getElementById("color-select").value;
    const productImage = document.getElementById("product-image").querySelector("img").src;

    const product = {
        name: productName,
        price: parseInt(productPrice),
        color: productColor,
        image: productImage,
        quantity: productQuantity,
    };

    saveToCart(product);
    updateCartBadge();
    showPopupMessage(); 
});

function saveToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex(
        (item) => item.name === product.name && item.color === product.color
    );

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const kartBadge = document.querySelector(".kart-badge");

    if (totalItems > 0) {
        kartBadge.textContent = totalItems;
        kartBadge.classList.remove("d-none");
    } else {
        kartBadge.classList.add("d-none");
    }
}

function showPopupMessage() {
    const overlay = document.getElementById("overlay");
    const popupMessage = document.getElementById("popup-message");

    overlay.style.display = "block";
    popupMessage.style.display = "block";

    document.getElementById("close-popup").addEventListener("click", hidePopupMessage);
}

function hidePopupMessage() {
    const overlay = document.getElementById("overlay");
    const popupMessage = document.getElementById("popup-message");

    overlay.style.display = "none";
    popupMessage.style.display = "none";
}


updateCartBadge();

