var datos;

	
function CallServiceMenujq (tipo)
{
  var uriServer = "";
  $.ajax({
    url: uriServer, 
    type: "get",
    datatype: "json",
    success: function (data, tipo){
      OnSuccess(data, tipo);

    },
    error: OnError
  });
}

function OnSuccess(data, tipo)
{
  datos = data;
  cargarMenu(tipo);

}

function OnError(jqXHR, textStatus, errorThrown)
{
  alert(errorThrown);
}

function cargarMenu(tipo){

  try {
    
    let MenuId = document.getElementById("menu-container-id")
    MenuId.innerHTML = "";
    let menuItem;
  
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