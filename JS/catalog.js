document.addEventListener("DOMContentLoaded", function() {
    const products = [
        {
            id: 1,
            name: "Limpiavidrios Xtreme Power 5L",
            price: 2499,
            oldPrice: 3499,
            category: "ofertas",
            image: "assets/images/products/limpieza1.jpg",
            badge: "OFERTA SEMANAL",
            description: "Pack económico para uso profesional",
            marca: "La Yunta"
        },
        {
            id: 2,
            name: "Coca-Cola 2.25L x6 pack",
            price: 5999,
            oldPrice: 8999,
            category: "promos",
            image: "assets/images/products/gaseosas.jpeg",
            badge: "2x1",
            description: "Promoción válida hasta agotar stock",
            marca: "Coca-Cola"
        },
        {
            id: 3,
            name: "Aceite de Girasol La Yunta 5L",
            price: 4499,
            category: "marcas",
            image: "assets/images/products/aceite.jpg",
            badge: "MARCA PROPIA",
            description: "Producto premium de nuestra línea",
            marca: "La Yunta"
        }
    ];

    const catalogGrid = document.querySelector('.catalog-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderProducts(filter = 'all') {
        catalogGrid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => {
                if(filter === 'marcas') return product.marca === "La Yunta";
                return product.category === filter;
            });

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="pricing">
                        <span class="product-price">$${product.price.toLocaleString('es-AR')}</span>
                        ${product.oldPrice ? `<span class="product-old-price">Antes $${product.oldPrice.toLocaleString('es-AR')}</span>` : ''}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                </div>
            `;
            catalogGrid.appendChild(productCard);
        });
    }

    function handleFilterClick(e) {
        const filter = e.target.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(filter);
    }

    function handleAddToCart(e) {
        if(e.target.closest('.add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            console.log('Producto agregado:', product);
            updateCartCount();
        }
    }

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-icon::after');
        if(cartCount) {
            const currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + 1;
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
    
    catalogGrid.addEventListener('click', handleAddToCart);

    renderProducts();
});