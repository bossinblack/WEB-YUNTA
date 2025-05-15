// mapa.js
function initMap() {
    // Coordenadas centrales (ej: Mendoza)
    const center = { lat: -32.883330, lng: -68.846550 };
    
    // Configuración del mapa
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
        mapTypeControl: true,
        streetViewControl: false,
        styles: [
            {
                featureType: "poi",
                stylers: [{ visibility: "off" }]
            }
        ]
    });

    // Lista de sucursales
    const sucursales = [
        {
            nombre: "Sucursal Centro",
            direccion: "Av. San Martín 1234, Mendoza",
            telefono: "0800-111-2222",
            horario: "Lun-Vie 8-21hs",
            position: { lat: -32.883330, lng: -68.846550 }
        },
        {
            nombre: "Sucursal Godoy Cruz",
            direccion: "Beltrán 567, Godoy Cruz",
            telefono: "0800-333-4444",
            horario: "Lun-Sab 9-20hs",
            position: { lat: -32.918079, lng: -68.839935 }
        },
        {
            nombre: "Sucursal Guaymallén",
            direccion: "Bandera de los Andes 890",
            telefono: "0800-555-6666",
            horario: "Lun-Dom 8-22hs",
            position: { lat: -32.899147, lng: -68.784698 }
        }
    ];

    // Crear marcadores
    sucursales.forEach(sucursal => {
        const marker = new google.maps.Marker({
            position: sucursal.position,
            map: map,
            title: sucursal.nombre,
            icon: {
                url: "assets/icons/marker.png",
                scaledSize: new google.maps.Size(40, 40)
            }
        });

        // InfoWindow
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>${sucursal.nombre}</h3>
                    <p>${sucursal.direccion}</p>
                    <p>Tel: ${sucursal.telefono}</p>
                    <p>Horario: ${sucursal.horario}</p>
                </div>
            `
        });

        // Event listeners
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}