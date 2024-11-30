window.onload = initMap;
window.onload = loadPagina;

function loadPagina() {
    CallServiceMenujq("ALL");
}


let map, directionsService, directionsRenderer, marker1;

document.addEventListener("DOMContentLoaded", () => {
    const tipoRadios = document.querySelectorAll('input[name="filter-type"]');
    const priceSelect = document.getElementById("price-filter");
  
    tipoRadios.forEach(radio => {
      radio.addEventListener("change", () => {
        const tipo = document.querySelector('input[name="filter-type"]:checked').value;
        const ordenPrecio = priceSelect.value;
        CallCatalogofiltro(tipo, ordenPrecio);
      });
    });
    priceSelect.addEventListener("change", () => {
      const tipo = document.querySelector('input[name="filter-type"]:checked').value;
      const ordenPrecio = priceSelect.value;
      CallCatalogofiltro(tipo, ordenPrecio);
    });
  
    CallCatalogofiltro("Todos", "default");
  });

/*async function initMap() {
  // The location of Uluru
  const position = { lat: 10.083014826799685, lng: -84.24696911420385 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}
*/
initMap();

function initMap() {
    const storeLocation = { lat: 10.083014826799685, lng: -84.24696911420385 }; // San José, Costa Rica (ejemplo)

    map = new google.maps.Map(document.getElementById("map"), {
        center: storeLocation,
        zoom: 14,
    });

    marker1 = new google.maps.Marker({
        position: storeLocation,
        map: map,
        title: "Tienda",
    });

    // Inicializar servicios de direcciones
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map, 
        suppressMarkers: false, 
    });

    
    map.addListener("click", (event) => {
        const userLocation = event.latLng;

        calculateAndDisplayRoute(userLocation, storeLocation);
    });
}


function calculateAndDisplayRoute(userLocation, storeLocation) {
    directionsService.route(
        {
            origin: userLocation, 
            destination: storeLocation, 
            travelMode: google.maps.TravelMode.DRIVING, 
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);


                const route = response.routes[0].legs[0]; 
                const distance = route.distance.text; 
                const duration = route.duration.text; 

                
                document.getElementById("route-time").textContent = `Tiempo estimado: ${duration}`;
                document.getElementById("route-distance").textContent = `Distancia: ${distance}`;

                
                const routeInfoContainer = document.getElementById("route-info");
                routeInfoContainer.style.opacity = "1";
            } else {
                alert("No se pudo calcular la ruta: " + status);
            }
        }
    );
}

function calculateAge() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById('age').value = age;
}

function emailCliente() {
    let parms = {
        name: document.getElementById("fullName").value, 
        email: document.getElementById("email").value,   
        genre: document.querySelector('input[name="gender"]:checked').value, 
        date: document.getElementById("birthDate").value 
    };

    //Validar que todos los valores se hayan llenado correctamente
    if (!parms.name || !parms.email || !parms.genre || !parms.date) {
        alert("Por favor, completa todos los campos del formulario.");
        return;
    }

    console.log(parms); 

    enviarEmail(parms);
}

function enviarEmail(parms) {
    emailjs.send("service_4qljfrf","template_dw4makc",parms).then(alert("Email enviado"));
}
