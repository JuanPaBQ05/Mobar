function getProductNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("product");
}

function loadProductData() {
    const productName = getProductNameFromURL();

    if (!productName) {
        alert("No se encontró el nombre del producto");
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


//CARGAR LOS DETALLES PARA LA PAGINA CON LOS PARAMETROS
function fillProductDetails(productos) {
    const mainProduct = productos[0];

    document.getElementById("product-name").textContent = mainProduct.nombre;
    document.getElementById("product-price").textContent = `₡${mainProduct.precio}`;
    document.getElementById("product-description").textContent = mainProduct.detalle;

    const $productImageDiv = $("#product-image");
    $productImageDiv.empty();

    const $mainImageElement = $("<img>").addClass("card-img img-fluid");
    const mainImageSrc = mainProduct.imagen1 && mainProduct.imagen1 !== "valor"
        ? mainProduct.imagen1
        : "assets/img/default-image.jpg";
    $mainImageElement.attr("src", mainImageSrc).attr("alt", mainProduct.nombre);
    $productImageDiv.append($mainImageElement);

    // Carrusel de imágenes
    const $carouselInner = $(".carousel-inner");
    $carouselInner.empty();

    const allImages = [];
    productos.forEach(product => {
        if (product.imagen1 && product.imagen1 !== "valor") allImages.push(product.imagen1);
        if (product.imagen2 && product.imagen2 !== "valor") allImages.push(product.imagen2);
        if (product.imagen3 && product.imagen3 !== "valor") allImages.push(product.imagen3);
    });

    let activeClassSet = false;
    for (let i = 0; i < allImages.length; i += 3) {
        const imagesChunk = allImages.slice(i, i + 3);
        const $carouselItem = $("<div>").addClass("carousel-item").addClass(activeClassSet ? "" : "active");
        activeClassSet = true;

        const $rowDiv = $("<div>").addClass("row");

        imagesChunk.forEach(imageSrc => {
            const $colDiv = $("<div>").addClass("col-4");
            const $link = $("<a>").attr("href", "#");
            const $img = $("<img>").addClass("card-img img-fluid").attr("src", imageSrc).attr("alt", "Product Image");

            $link.append($img);
            $colDiv.append($link);
            $rowDiv.append($colDiv);
        });

        $carouselItem.append($rowDiv);
        $carouselInner.append($carouselItem);
    }
    const $colorContainer = $("#color-id");
    $colorContainer.empty();

    const $select = $("<select>")
        .attr("id", "color-select")
        .addClass("form-select");

    const uniqueColors = new Set();
    productos.forEach(product => {
        if (product.color && product.color !== "valor") {
            uniqueColors.add(product.color);
        }
    });

    if (uniqueColors.size === 0) {
        const $defaultOption = $("<option>")
            .text("Sin colores disponibles")
            .attr("disabled", true)
            .attr("selected", true);
        $select.append($defaultOption);
    } else {
        uniqueColors.forEach(color => {
            const $option = $("<option>")
                .text(color)
                .attr("value", color);
            $select.append($option);
        });
    }

    const $selectLabel = $("<label>")
        .attr("for", "color-select")
        .text("Seleccione un color:");

    $colorContainer.append($selectLabel);
    $colorContainer.append($select);
}





  function cargarColores(productos, productName) {
    const productosConMismoNombre = productos.filter(product => product.nombre === productName);

    const coloresDisponibles = new Set();
    productosConMismoNombre.forEach(product => {
        if (product.color && product.color !== "valor") {
            coloresDisponibles.add(product.color);
        }
    });

    const colorContainer = $("#color-id");
    colorContainer.empty(); 

    coloresDisponibles.forEach(color => {
        const colorDiv = $("<div>").addClass("color-box")
            .css("background-color", mapColor(color)) 
            .attr("data-color", color)
            .on("click", function() {
                $(".color-box").removeClass("selected"); 
                $(this).addClass("selected"); 
                $("#selected-color").val(color); 
            });

        colorContainer.append(colorDiv);
    });
}
window.onload = loadProductData;



