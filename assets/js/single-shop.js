function getProductNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("product");
}

function loadProductData() {
    const productName = getProductNameFromURL();

    if (!productName) {
        alert("No se encontró el nombre del producto en la URL.");
        return;
    }

    const uriServer = "https://juanpabq05.github.io/Mobar/assets/datos/bolsos.json";

    $.ajax({
        url: uriServer,
        type: "get",
        dataType: "json",
        success: function (data) {
            const productos = data.bolsos.filter(bolso => bolso.nombre === productName);
            if (productos.length > 0) {
                fillProductDetails(productos);
            } else {
                alert("No se encontraron productos con ese nombre.");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al cargar el JSON:", errorThrown);
        }
    });
}

function fillProductDetails(productos) {
    // Toma el primer producto para llenar los detalles generales
    const mainProduct = productos[0];
  
    // Llena los elementos generales
    document.getElementById("product-name").textContent = mainProduct.nombre;
    document.getElementById("product-price").textContent = `₡${mainProduct.precio}`;
    document.getElementById("product-description").textContent = mainProduct.detalle;
  
    // Llena las imágenes y los colores
    const imageContainer = document.getElementById("image-container");
    const colorContainer = document.getElementById("color-container");
  
    imageContainer.innerHTML = ""; // Limpia cualquier contenido previo
    colorContainer.innerHTML = ""; // Limpia cualquier contenido previo
  
    productos.forEach(producto => {
      if (producto.imagen1 !== "valor") {
        const imageElement = document.createElement("img");
        imageElement.src = producto.imagen1;
        imageElement.alt = producto.nombre;
        imageElement.classList.add("product-image"); // Aplica tus estilos
        imageContainer.appendChild(imageElement);
      }
  
      const colorElement = document.createElement("div");
      colorElement.classList.add("color-indicator");
      colorElement.style.backgroundColor = mapColor(producto.color); // Asigna el color (función mapColor)
      colorElement.title = producto.color; // Muestra el nombre del color al pasar el mouse
      colorContainer.appendChild(colorElement);
    });
  }
  function mapColor(colorName) {
    const colorMap = {
      "Café": "#8B4513",
      "Rosado": "#FFC0CB",
      "Negro": "#000000",
      "Blanco": "#FFFFFF",
    };
  
    return colorMap[colorName] || "#CCCCCC"; 
  }

window.onload = loadProductData;
