function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const carritoProductos = document.getElementById("carrito-productos");
    const precioColonesElement = document.getElementById("precio-colones");
    const precioDolaresElement = document.getElementById("precio-dolares");
    const cantidadProductosElement = document.getElementById("cantidad-productos");

    carritoProductos.innerHTML = ""; 

    let totalColones = 0;

    cart.forEach((producto, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("d-flex", "align-items-center", "mb-3");

        const productImage = document.createElement("img");
        productImage.src = producto.image || "https://via.placeholder.com/100"; 
        productImage.alt = producto.name;
        productImage.classList.add("product-image", "me-3");

        const productDetails = document.createElement("div");
        productDetails.classList.add("ms-3", "flex-grow-1");

        const productName = document.createElement("h5");
        productName.textContent = producto.name;

        const productPrice = document.createElement("p");
        productPrice.classList.add("mb-2");
        productPrice.textContent = `₡${Number(producto.price).toLocaleString()}`; 

        const productColor = document.createElement("p");
        productColor.classList.add("mb-2");
        productColor.textContent = `Color: ${producto.color}`;

        const quantityControls = document.createElement("div");
        quantityControls.classList.add("d-flex", "align-items-center");

        const btnMinus = document.createElement("button");
        btnMinus.classList.add("btn", "btn-outline-secondary", "me-2");
        btnMinus.textContent = "-";
        btnMinus.addEventListener("click", () => updateQuantity(producto, "minus"));

        const quantityDisplay = document.createElement("span");
        quantityDisplay.classList.add("mx-2");
        quantityDisplay.textContent = producto.quantity;

        const btnPlus = document.createElement("button");
        btnPlus.classList.add("btn", "btn-outline-secondary", "me-3");
        btnPlus.textContent = "+";
        btnPlus.addEventListener("click", () => updateQuantity(producto, "plus"));

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.innerHTML = '<i class="bi bi-trash"></i>'; 
        btnDelete.addEventListener("click", () => deleteProduct(index));

        quantityControls.appendChild(btnMinus);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(btnPlus);

        productDetails.appendChild(productName);
        productDetails.appendChild(productPrice);
        productDetails.appendChild(productColor);
        productDetails.appendChild(quantityControls);

        productDiv.appendChild(productImage);
        productDiv.appendChild(productDetails);
        productDiv.appendChild(btnDelete); 

        carritoProductos.appendChild(productDiv);

        totalColones += Number(producto.price) * Number(producto.quantity);
    });

    precioColonesElement.textContent = `₡${totalColones.toLocaleString()}`;

    colonesADolares(totalColones, precioDolaresElement);

    cantidadProductosElement.innerHTML = `<strong>En tu bolso: ${cart.length} elemento${cart.length > 1 ? "s" : ""}</strong>`;
}


function colonesADolares(totalColones, precioDolaresElement) {
    $.ajax({
        url: "https://api.exchangerate-api.com/v4/latest/CRC",
        type: "GET",
        dataType: "json",
        success: function (data) {
            const exchangeRate = data.rates.USD;  
            const totalDolares = totalColones * exchangeRate; 
            precioDolaresElement.textContent = `$${totalDolares.toFixed(2)}`;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al obtener el tipo de cambio:", errorThrown);
            precioDolaresElement.textContent = "Error al calcular";
        }
    });
}


function deleteProduct(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge(); 
    loadCart(); 
}

function updateQuantity(producto, action) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.name === producto.name && item.color === producto.color);

    if (productIndex !== -1) {
        if (action === "plus") {
            cart[productIndex].quantity++;
        } else if (action === "minus" && cart[productIndex].quantity > 1) {
            cart[productIndex].quantity--;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart(); 
    }
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart(); 
}

loadCart();

document.getElementById("clear-cart-btn").addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        clearCart();
    }
});