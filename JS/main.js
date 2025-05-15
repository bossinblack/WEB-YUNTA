document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Menú Mobile
    // ======================
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Cerrar menú al hacer click en enlaces
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // ======================
    // Countdown Sticky
    // ======================
    const countdownContainer = document.querySelector('.offer-countdown');
    const originalPosition = countdownContainer.offsetTop;
    let isSticky = false;

    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        // Activar sticky después de 100px de scroll
        if (scrollPosition > 100 && !isSticky) {
            countdownContainer.classList.add('countdown-sticky');
            isSticky = true;
        } 
        // Desactivar sticky
        else if (scrollPosition <= 100 && isSticky) {
            countdownContainer.classList.remove('countdown-sticky');
            isSticky = false;
        }

        // Efecto parallax
        if (!isSticky) {
            const speed = 0.3;
            const offset = (scrollPosition - originalPosition) * speed;
            countdownContainer.style.transform = `translateY(${offset}px)`;
        }
    }

    window.addEventListener('scroll', handleScroll);

    // ======================
    // Countdown Timer
    // ======================
    function updateCountdown() {
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Domingo
        const endOfWeek = new Date();

        // Calcular próximo domingo a las 23:59:59
        if (currentDay === 0 && now.getHours() >= 23 && now.getMinutes() >= 59) {
            endOfWeek.setDate(endOfWeek.getDate() + 7);
        } else {
            endOfWeek.setDate(endOfWeek.getDate() + (7 - currentDay));
        }
        
        endOfWeek.setHours(23, 59, 59, 0);

        const diff = endOfWeek - now;

        if (diff <= 0) {
            location.reload(); // Recargar para nuevas ofertas
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Actualizar DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Ejecutar inmediatamente

    // ======================
    // Smooth Scroll
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ======================
    // Animación Banner Promo
    // ======================
    const promoBanner = document.querySelector('.banner-promo');
    if (promoBanner) {
        setTimeout(() => {
            promoBanner.style.transform = 'translateY(0)';
            promoBanner.style.opacity = '1';
        }, 1500);
    }

    // ======================
    // Contador Sucursales
    // ======================
    const sucursalesCount = document.querySelector('.feature-item:nth-child(3) span');
    if (sucursalesCount) {
        let count = 0;
        const target = 20;
        const interval = setInterval(() => {
            count++;
            sucursalesCount.textContent = `+${count} sucursales`;
            if (count === target) clearInterval(interval);
        }, 100);
    }
});
// Filtrado Avanzado
document.querySelectorAll('.type-filter button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.type-filter button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const type = this.dataset.filter;
        filterLocations(type);
    });
});

function filterLocations(type) {
    document.querySelectorAll('.location-card').forEach(card => {
        card.style.display = (type === 'all' || card.dataset.type === type) ? 'block' : 'none';
        card.style.animation = 'fadeIn 0.5s ease';
    });
}

// Inicializar mapa con todas las ubicaciones
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: -34.6037, lng: -68.3300 }, // Coordenadas de San Rafael
        mapTypeId: 'roadmap'
    });

    const locations = [
        // Sucursales
        { name: 'Vélez', lat: -34.6040, lng: -68.3301, type: 'sucursal' },
        { name: 'Libertador', lat: -34.6050, lng: -68.3350, type: 'sucursal' },
        // Franquicias
        { name: '9 de Julio', lat: -34.6025, lng: -68.3250, type: 'franquicia' },
        { name: 'Malargüe', lat: -34.6070, lng: -68.3400, type: 'franquicia' },
        // Añadir todas las ubicaciones restantes
    ];

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
            icon: {
                url: location.type === 'sucursal' ? 'assets/icons/marker-red.png' : 'assets/icons/marker-yellow.png',
                scaledSize: new google.maps.Size(40, 40)
            }
        });
    });
}