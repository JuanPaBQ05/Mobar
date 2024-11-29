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
      OnSuccess(data, tipo); // Pasa el tipo como parámetro
    },
    error: OnError
  });
}

// Función de éxito al cargar el JSON
function OnSuccess(data, tipo) {
  datos = data; // Almacena los datos globalmente
  cargarCatalogo(tipo);
}

// Función de error
function OnError(jqXHR, textStatus, errorThrown) {
  alert(`Error al cargar los datos: ${errorThrown}`);
}


function cargarCatalogo(tipo) {
  try {
    let catalogContainer = document.getElementById("catalog-container-id");
    catalogContainer.innerHTML = "";
    let card;

    // Conjunto para almacenar las primeras 3 letras únicas
    let nombresProcesados = new Set();

    // Recorrer los datos y generar tarjetas dinámicamente
    datos.bolsos.forEach(bolso => {
      // Obtener las primeras 3 letras del nombre
      let primerasTresLetras = bolso.nombre.substring(0, 3).toLowerCase();

      // Si ya existen en el conjunto, ignorar este bolso
      if (nombresProcesados.has(primerasTresLetras)) {
        return; // No añadir al catálogo
      }

      // Agregar las primeras 3 letras al conjunto
      nombresProcesados.add(primerasTresLetras);

      // Crear la tarjeta del bolso
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

