const clearCartBtn = document.getElementById("clear-cart-btn");
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
        kartBadge.textContent = totalItems;
        kartBadge.classList.remove("d-none");
        clearCartBtn.classList.remove("d-none");
    } else {
        kartBadge.classList.add("d-none"); 
        clearCartBtn.classList.add("d-none"); 
    }
}

function clearCart() {
    localStorage.removeItem("cart");
    updateCartBadge();
    alert("¡El carrito ha sido vaciado!");
}

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
            clearCart();
        }
    });
}

updateCartBadge();