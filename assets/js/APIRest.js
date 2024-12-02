var datos;

/*
function CallServiceMenujq(tipo) {
  var uriServer = "https://juanpabq05.github.io/Mobar/assets/datos/bolsos.json";
  $.ajax({
    url: uriServer,
    type: "get",
    datatype: "json",
    success: function (data, tipo) {
      OnSuccess(data, tipo);

    },
    error: OnError
  });
}*/

function CallServiceMenujq(tipo) {
  var uriServer = "https://juanpabq05.github.io/Mobar/assets/datos/bolsos.json";
  $.ajax({
    url: uriServer,
    type: "get",
    dataType: "json",
    success: function (data, tipo) {
      OnSuccess(data, tipo);
    },
    error: OnError
  });
}

function OnSuccess(data, tipo) {
  datos = data;
  cargarCatalogo(tipo);
}

function OnError(jqXHR, textStatus, errorThrown) {
  alert(`Error al cargar los datos: ${errorThrown}`);
}


function cargarCatalogo(tipo) {
  try {
    let catalogContainer = document.getElementById("catalog-container-id");
    catalogContainer.innerHTML = "";
    let card;

    let nombresProcesados = new Set();

    datos.bolsos.forEach(bolso => {
      let primerasTresLetras = bolso.nombre.substring(0, 3).toLowerCase();

      if (nombresProcesados.has(primerasTresLetras)) {
        return;
      }

      nombresProcesados.add(primerasTresLetras);

      card = `
          <div class="col-md-4 col-sm-6 product-item">
    <div class="card-catalog ${bolso.imagen2 === "valor" ? "single-image" : ""}">
        <div class="card h-100">
            <div class="card-image">
                <!-- Primera imagen -->
                <img src="${bolso.imagen1}" alt="${bolso.nombre}" class="main-image">
                <!-- Segunda imagen si existe -->
                ${bolso.imagen2 !== "valor" ? `<img src="${bolso.imagen2}" alt="${bolso.nombre}" class="second-image">` : ""}
                <div class="card-overlay">
                    <div>
                        <i class="bi bi-bag-heart"></i>
                        <span class="tooltip">Añadir a deseados</span>
                    </div>
                    <div>
                        <i class="bi bi-eye"></i>
                        <span class="tooltip">Ver producto</span>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <p class="card-description">${bolso.nombre}</p>
                <p class="card-price text-success">₡${bolso.precio}</p>
                <button class="btn btn-primary btn-cart">Añadir al carrito</button>
            </div>
        </div>
    </div>
</div>
          `;

      catalogContainer.innerHTML += card;
    });

  } catch (error) {
    alert(`Error al generar el catálogo: ${error}`);
  }
}



/*
function cargarCatalogo(tipo) {
  try {
    let catalogContainer = document.getElementById("catalog-container-id");
    catalogContainer.innerHTML = "";
    let card;

    // Recorrer los datos y generar tarjetas dinámicamente
    datos.bolsos.forEach(bolso => {
      card = "";
      card = `
          <div class="col-md-4 col-sm-6 product-item">
    <div class="card-catalog ${bolso.imagen2 === "valor" ? "single-image" : ""}">
        <div class="card h-100">
            <div class="card-image">
                <!-- Primera imagen -->
                <img src="${bolso.imagen1}" alt="${bolso.nombre}" class="main-image">
                <!-- Segunda imagen si existe -->
                ${bolso.imagen2 !== "valor" ? `<img src="${bolso.imagen2}" alt="${bolso.nombre}" class="second-image">` : ""}
                <div class="card-overlay">
                    <div>
                        <i class="bi bi-bag-heart"></i>
                        <span class="tooltip">Añadir a deseados</span>
                    </div>
                    <div>
                        <i class="bi bi-eye"></i>
                        <span class="tooltip">Ver producto</span>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <p class="card-description">${bolso.nombre}</p>
                <p class="card-price text-success">₡${bolso.precio}</p>
                <button class="btn btn-primary btn-cart">Añadir al carrito</button>
            </div>
        </div>
    </div>
</div>
          `;

      // Insertar la tarjeta en el contenedor
      catalogContainer.innerHTML += card;
    });

  } catch (error) {
    alert(`Error al generar el catálogo: ${error}`);
  }
}*/


/*
function OnSuccess(data, tipo) {
  datos = data;
  cargarMenu(tipo);

}

function OnError(jqXHR, textStatus, errorThrown) {
  alert(errorThrown);
}

function cargarMenu(tipo) {

  try {
    let MenuId = document.getElementById("menu-container-id")
    MenuId.innerHTML = "";
    let menuItem;
    let moneda = registrarMoneda(2, "");
    let tipoCambio = 1.00;
    datos.platillos.forEach(platillo => {
      menuItem = "";
      menuItem = `
      <div class="col-lg-6 menu-item filter-${platillo.clasificacion}">
            <img src="${platillo.imagen}" class="menu-img" alt="">
            <div class="menu-content">
                <a href="#">${platillo.nombre}</a><span>${platillo.precio}</span>
            </div>
            <div class="menu-ingredients">
                ${platillo.ingredientes}
            </div>
        </div
      `;

      MenuId.innerHTML += menuItem;

    });


  } catch (error) {
    alert(error);
  }


}
  */

function CallServiceMenuInicio() {
  var uriServer = "https://juanpabq05.github.io/Mobar/assets/datos/bolsos.json";
  $.ajax({
    url: uriServer,
    type: "get",
    dataType: "json",
    success: function (data) {
      OnSuccessInicio(data);
    },
    error: OnErrorInicio
  });
}

function OnSuccessInicio(data) {
  datos = data;
  cargarInicio();
}

function OnErrorInicio(jqXHR, textStatus, errorThrown) {
  alert(`Error al cargar los datos: ${errorThrown}`);
}



function cargarInicio() {
  try {
    let catalogContainer = document.getElementById("catalog-container-index");
    catalogContainer.innerHTML = "";

    let card;
    let nombresProcesados = new Set();
    let productosMostrados = 0;

    for (const bolso of datos.bolsos) {
      if (!bolso.imagen1 || bolso.imagen1 === "valor") {
        continue;
      }

      let primerasTresLetras = bolso.nombre.substring(0, 3).toLowerCase();

      if (nombresProcesados.has(primerasTresLetras)) {
        continue;
      }
      nombresProcesados.add(primerasTresLetras);

      card = `
        <div class="col-md-4 col-sm-6 product-item">
            <div class="card-catalog ${bolso.imagen2 === "valor" ? "single-image" : ""}">
                <div class="card h-100">
                    <div class="card-image">
                        <img src="${bolso.imagen1}" alt="${bolso.nombre}" class="main-image">
                        ${bolso.imagen2 !== "valor" ? `<img src="${bolso.imagen2}" alt="${bolso.nombre}" class="second-image">` : ""}
                        <div class="card-overlay">
                            <div>
                                <i class="bi bi-bag-heart"></i>
                                <span class="tooltip">Añadir a deseados</span>
                            </div>
                            <div>
                                <i class="bi bi-eye" data-product="${bolso.nombre}"></i>
                                <span class="tooltip">Ver producto</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-description" data-product="${bolso.nombre}">${bolso.nombre}</p>
                        <p class="card-price text-success">₡${bolso.precio}</p>
                    </div>
                </div>
            </div>
          </div>
      `;

      catalogContainer.innerHTML += card;

      productosMostrados++;

      if (productosMostrados >= 3) {
        break;
      }
    }
    if (catalogContainer.innerHTML === "") {
      catalogContainer.innerHTML = `<p>No hay productos disponibles para mostrar.</p>`;
    }

  } catch (error) {
    alert(`Error al cargar el inicio: ${error}`);
  }
}

function cargarCatalogofiltro(tipo, ordenPrecio) {
  try {
    let catalogContainer = document.getElementById("catalog-container-id");
    catalogContainer.innerHTML = "";
    let card;

    let nombresProcesados = new Set();

    let bolsosFiltrados = datos.bolsos.filter(bolso => {
      return tipo === "Todos" || bolso.clasificacion === tipo;
    });

    if (ordenPrecio === "asc") {
      bolsosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenPrecio === "desc") {
      bolsosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    bolsosFiltrados.forEach(bolso => {
      let primerasTresLetras = bolso.nombre.substring(0, 3).toLowerCase();

      if (nombresProcesados.has(primerasTresLetras)) {
        return;
      }

      nombresProcesados.add(primerasTresLetras);

      card = `
          <div class="col-md-4 col-sm-6 product-item">
            <div class="card-catalog ${bolso.imagen2 === "valor" ? "single-image" : ""}">
                <div class="card h-100">
                    <div class="card-image">
                        <img src="${bolso.imagen1}" alt="${bolso.nombre}" class="main-image">
                        ${bolso.imagen2 !== "valor" ? `<img src="${bolso.imagen2}" alt="${bolso.nombre}" class="second-image">` : ""}
                        <div class="card-overlay">
                            <div>
                                <i class="bi bi-bag-heart"></i>
                                <span class="tooltip">Añadir a deseados</span>
                            </div>
                            <div>
                                <i class="bi bi-eye" data-product="${bolso.nombre}"></i>
                                <span class="tooltip">Ver producto</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-description" data-product="${bolso.nombre}">${bolso.nombre}</p>
                        <p class="card-price text-success">₡${bolso.precio}</p>
                    </div>
                </div>
            </div>
          </div>
      `;

      catalogContainer.innerHTML += card;
    });

  } catch (error) {
    alert(`Error al generar el catálogo: ${error}`);
  }
}

document.getElementById("catalog-container-id").addEventListener("click", function (event) {
  const target = event.target;

  function getProductNameFromCard(element) {
    const card = element.closest(".card"); 
    if (card) {
      const descriptionElement = card.querySelector(".card-description");
      return descriptionElement ? descriptionElement.textContent.trim() : null;
    }
    return null;
  }

  if (target.classList.contains("card-description")) {
    const productName = getProductNameFromCard(target);
    if (productName) {
      console.log(`Redirigiendo al producto: ${productName}`);
      window.location.href = `shop-single.html?product=${encodeURIComponent(productName)}`;
    } else {
      console.error("No se pudo obtener el nombre del producto desde la descripción.");
    }
  }

  if (target.classList.contains("bi-eye")) {
    const productName = getProductNameFromCard(target);
    if (productName) {
      console.log(`Redirigiendo desde el ícono del ojo: ${productName}`);
      window.location.href = `shop-single.html?product=${encodeURIComponent(productName)}`;
    } else {
      console.error("No se pudo obtener el nombre del producto desde el ícono del ojo.");
    }
  }
});



function CallCatalogofiltro(tipo, ordenPrecio) {
  var uriServer = "https://juanpabq05.github.io/Mobar/assets/datos/bolsos.json";
  $.ajax({
    url: uriServer,
    type: "get",
    dataType: "json",
    success: function (data) {
      OnSuccessfiltro(data, tipo, ordenPrecio);
    },
    error: OnError
  });
}

function OnSuccessfiltro(data, tipo, ordenPrecio) {
  datos = data;
  cargarCatalogofiltro(tipo, ordenPrecio);
}


