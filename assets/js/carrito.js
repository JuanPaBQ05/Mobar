const clearCartBtn = document.getElementById("clear-cart-btn");
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    try {
        if (totalItems > 0) {
            kartBadge.textContent = totalItems;
            kartBadge.classList.remove("d-none");
            clearCartBtn.classList.remove("d-none");
        } else {
            kartBadge.classList.add("d-none"); 
            clearCartBtn.classList.add("d-none"); 
        }
    } catch (error) {
        
    }
    
}

function clearCart() {
    try {
        localStorage.removeItem("cart");
        updateCartBadge();
        alert("¡El carrito ha sido vaciado!");
    } catch (error) {
        
    }
   
}

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
            clearCart();
        }
    });
}

updateCartBadge();