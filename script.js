// script.js (corregido)
document.addEventListener("DOMContentLoaded", function () {

    // ----- SLIDER DE PROMOCIONES -----
    let currentSlide = 0;
    let isTransitioning = false;
    const slides = document.querySelectorAll('.promocion');
    const totalSlides = slides.length || 1;
    const slider = document.querySelector('.slider');

    function moveSlide(step) {
        if (!slider) return;
        if (isTransitioning) return;
        isTransitioning = true;

        currentSlide = (currentSlide + step + totalSlides) % totalSlides;
        const offset = -currentSlide * 100;
        slider.style.transition = "transform 0.2s ease-in-out";
        slider.style.transform = `translateX(${offset}%)`;

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    // Exponer globalmente por si hay onclick inline en el HTML
    window.moveSlide = moveSlide;

    // Botones prev/next (si existen)
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    if (prevBtn) prevBtn.addEventListener('click', function () { moveSlide(-1); resetAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { moveSlide(1); resetAutoSlide(); });

    function autoSlide() { moveSlide(1); }
    let slideInterval = setInterval(autoSlide, 3000);
    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 5000);
    }

    // ----- ELEMENTOS COMUNES -----
    const modal = document.getElementById('product-modal');
    const body = document.body;

    // Encontrar el botón de cerrar *solo si* modal existe
    let closeModalButton = null;
    if (modal) closeModalButton = modal.querySelector('.close-modal');

    // ----- CARRITO DE COMPRAS -----
    let cart = [];

    function updateCartCount() {
        const countEl = document.getElementById('cart-count');
        if (countEl) countEl.textContent = cart.length;
    }

    function addToCart(product) {
        cart.push(product);
        updateCartCount();
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }

    function showCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Tu carrito está vacío.';
            li.classList.add('empty-cart');
            cartItems.appendChild(li);
        } else {
            cart.forEach((p, index) => {
                // Elemento principal
                const li = document.createElement('li');
                li.classList.add('cart-item');

                // Contenedor izquierdo: imagen + texto
                const left = document.createElement('div');
                left.classList.add('cart-left');

                const img = document.createElement('img');
                img.src = p.imagen;
                img.alt = p.descripcion;
                img.classList.add('cart-item-image');

                const span = document.createElement('span');
                span.textContent = p.descripcion;
                span.classList.add('cart-item-text');

                left.appendChild(img);
                left.appendChild(span);

                // Estructura final
                li.appendChild(left);
                cartItems.appendChild(li);
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.addEventListener('load', () => {
        try {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = Array.isArray(savedCart) ? savedCart : [];
        } catch (e) {
            cart = [];
        }
        updateCartCount();
    });

    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const clearCart = document.getElementById('clear-cart');
    const buyCart = document.getElementById('buy-cart');

    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', () => {
            showCart();
            cartModal.classList.add('active');
        });
    }
    if (closeCart) closeCart.addEventListener('click', () => cartModal.classList.remove('active'));
    if (clearCart) clearCart.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cart');
        showCart();
        updateCartCount();
    });
    if (buyCart) buyCart.addEventListener('click', () => {
        if (cart.length === 0) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "El carrito esta vacío",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "La compra se realizó exitosamente",
                showConfirmButton: false,
                timer: 1500
            });
            cart = [];
            localStorage.removeItem('cart');
            showCart();
            updateCartCount();
            if (cartModal) cartModal.classList.remove('active');
        }
    });

    // ----- UTIL -----
    function normalizeText(text = '') {
        try {
            return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        } catch (e) {
            return String(text).toLowerCase();
        }
    }

    // ----- MODAL DE PRODUCTOS -----
    function openProductModal(category, products) {
        if (!modal) {
            console.error('product-modal no está presente en el DOM.');
            return;
        }
        const title = document.getElementById('category-title');
        const productImagesContainer = document.getElementById('product-images');

        if (title) title.textContent = category || 'Categoría';
        if (productImagesContainer) productImagesContainer.innerHTML = '';

        (products || []).forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');

            const imgElement = document.createElement('div');
            imgElement.classList.add('product-image');
            imgElement.style.backgroundImage = `url('${product.imagen}')`;

            const descElement = document.createElement('p');
            descElement.classList.add('product-description');
            descElement.textContent = product.descripcion;

            const addButton = document.createElement('button');
            addButton.textContent = 'Agregar al carrito';
            addButton.classList.add('add-to-cart');
            addButton.addEventListener('click', () => addToCart(product));

            productDiv.appendChild(imgElement);
            productDiv.appendChild(descElement);
            productDiv.appendChild(addButton);
            if (productImagesContainer) productImagesContainer.appendChild(productDiv);
        });

        const modalContent = modal.querySelector('.product-content, .modal-content');
        if (modalContent) modalContent.scrollTop = 0;

        modal.style.display = 'flex';
        body.style.overflow = 'hidden';
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', function () {
            modal.style.display = 'none';
            body.style.overflow = '';
        });
    } else {
        if (modal) {
            modal.addEventListener('click', function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    body.style.overflow = '';
                }
            });
        }
    }

    // ----- BASE DE DATOS DE PRODUCTOS -----
    const productsData = {
        'Accesorios y Regalería': {
            'Aros': [
                { imagen: 'imagenes/acc1.jpg', descripcion: 'Aros de acero quirírgico. Frutillas' },
                { imagen: 'imagenes/acc2.jpg', descripcion: 'Aros de acero quirírgico. Ballenas' },
                { imagen: 'imagenes/acc3.jpg', descripcion: 'Aros de acero quirírgico. Elefantes' },
                { imagen: 'imagenes/acc4.jpg', descripcion: 'Aros de acero quirírgico. Luna' },
                { imagen: 'imagenes/acc5.jpg', descripcion: 'Aros de acero quirírgico' }
            ],
            'Pulseras': [
                { imagen: 'imagenes/acc13.jpg', descripcion: 'Pulsera de acero. Mariposa' },
                { imagen: 'imagenes/acc14.jpg', descripcion: 'Pulsera de acero.' },
                { imagen: 'imagenes/acc15.jpg', descripcion: 'Pulsera de acero.Hojas' },
                { imagen: 'imagenes/acc16.jpg', descripcion: 'Pulsera de acero. Rombos' }
            ],
            'Collares': [
                { imagen: 'imagenes/acc20.jpg', descripcion: 'Collar de acero. Oso' },
                { imagen: 'imagenes/acc21.jpg', descripcion: 'Collar de acero. Corazón rojo' },
                { imagen: 'imagenes/acc22.jpg', descripcion: 'Collar de acero. Corazón' },
                { imagen: 'imagenes/acc23.jpg', descripcion: 'Collar de acero. Oso celeste y rosa' }
            ],
            'Neceser': [
                { imagen: 'imagenes/acc12.jpg', descripcion: 'Neceser. Rosa y negro' },
                { imagen: 'imagenes/acc55.jpg', descripcion: 'Neceser. Efecto galaxia' },
                { imagen: 'imagenes/acc56.jpg', descripcion: 'Neceser. Rosado con textura' }
            ]
        },
        'Electro medicina': [
            { imagen: 'imagenes/elc2.jpg', descripcion: 'Tensiometro aneroide con estetoscopio' },
            { imagen: 'imagenes/elc3.jpg', descripcion: 'Lupa de escala y guía sw agujas para jeringas de insulina' },
            { imagen: 'imagenes/elc4.jpg', descripcion: 'FreeStyle Optium. Sistema de monitoreo de glocosa y cetonas en sangre' },
            { imagen: 'imagenes/elc5.jpg', descripcion: 'FreeStyle Optium Neo. Sistema de monitoreo de glocosa y cetonas en sangre' },
            { imagen: 'imagenes/elc1.jpg', descripcion: 'Cámara espaciadora valvulada' },
            { imagen: 'imagenes/fit38.jpg', descripcion: 'Masajeador' }
        ],
        'Fitness & Movimiento': {
            'Venda, fajas e inmovilizadores': [
                { imagen: 'imagenes/fit1.jpg', descripcion: 'Cabestrillo Dobre Tira negro' },
                { imagen: 'imagenes/fit2.jpg', descripcion: 'Cabestrillo faja universal' },
                { imagen: 'imagenes/fit3.jpg', descripcion: 'Chincha rotuliana universal' },
                { imagen: 'imagenes/fit4.jpg', descripcion: 'Codera Neoprene con banda de ajuste' },
                { imagen: 'imagenes/fit5.jpg', descripcion: 'Codera Neoprene tenista' }
            ],
            'Cremas': [
                { imagen: 'imagenes/fit31.jpg', descripcion: 'Atomo desinflamante clásico 220gr.' },
                { imagen: 'imagenes/fit32.jpg', descripcion: 'Atomo desinflamante 110gr' },
                { imagen: 'imagenes/fit33.jpg', descripcion: 'Bengue desinflamante' }
            ],
        },
        'Suplementos, Vitaminas y Productos naturales': {
            'Vitaminas': [
                { imagen: 'imagenes/vit1.jpg', descripcion: 'Colágeno' },
                { imagen: 'imagenes/vit2.jpg', descripcion: 'Megacistin max' },
                { imagen: 'imagenes/vit3.jpg', descripcion: 'Cabello, piel y uñas' },
                { imagen: 'imagenes/vit4.jpg', descripcion: 'Omegan' },
                { imagen: 'imagenes/vit5.jpg', descripcion: 'Lecitina 1200' }
            ],
            'Suplementos': [
                { imagen: 'imagenes/sup.jpg', descripcion: 'BCAA. Suplemento dietario a base de aminoacidos ramificados, vitamina C, B2 y B6' },
                { imagen: 'imagenes/sup2.jpg', descripcion: 'Creatine. Suplemento dietario a base de monohidrato de creatina' },
                { imagen: 'imagenes/sup3.jpg', descripcion: 'Energy gel. Repositor energético. +3 cafeína, taurina ginseng. Sabor a frutos rojos ' },
                { imagen: 'imagenes/sup4.jpg', descripcion: 'Energy gel. Repositor energético. +4 L-valina, L-leucina, L-isoleucinal, L-glutamina. Sabor a frutos rojos' },
                { imagen: 'imagenes/sup5.jpg', descripcion: 'Glutamine. Suplemento dietario a base de L-glutamina' },
                { imagen: 'imagenes/sup6.jpg', descripcion: 'Multi vitaminico y mineral. Suplemento dietario a base de vitaminas y minerales' },
                { imagen: 'imagenes/sup7.jpg', descripcion: 'Pre workout energy' }
            ]
        },
    };

    // ----- BÚSQUEDA DE PRODUCTOS -----
    function handleSearch() {
        const inputEl = document.getElementById('search-input');
        const searchInput = inputEl ? inputEl.value.trim() : '';
        if (!searchInput) {
            alert('Por favor, ingrese un término de búsqueda.');
            return;
        }

        const searchTerm = normalizeText(searchInput);
        let filteredProducts = [];

        function searchProducts(categoryData) {
            Object.keys(categoryData).forEach(category => {
                const data = categoryData[category];
                if (Array.isArray(data)) {
                    const matches = data.filter(product =>
                        normalizeText(product.descripcion).includes(searchTerm)
                    );
                    if (matches.length > 0) filteredProducts.push(...matches);
                } else if (typeof data === 'object') {
                    searchProducts(data);
                }
            });
        }
        searchProducts(productsData);

        // eliminar duplicados por imagen
        const imagenesUnicas = new Set();
        filteredProducts = filteredProducts.filter(product => {
            if (!imagenesUnicas.has(product.imagen)) {
                imagenesUnicas.add(product.imagen);
                return true;
            }
            return false;
        });

        const warningModal = document.getElementById('warning-modal');
        if (warningModal) warningModal.style.display = 'none';

        if (filteredProducts.length > 0) {
            openProductModal('Resultados de búsqueda', filteredProducts);
        } else {
            openWarningModal();
        }

        if (inputEl) inputEl.value = '';
    }

    function openWarningModal() {
        const warningModal = document.getElementById('warning-modal');
        if (!warningModal) {
            console.error('warning-modal no existe en el DOM');
            return;
        }
        warningModal.style.display = 'flex';
        const closeBtn = document.getElementById('close-warning-modal');
        if (closeBtn) {
            closeBtn.replaceWith(closeBtn.cloneNode(true));
            const newClose = document.getElementById('close-warning-modal');
            newClose.addEventListener('click', () => {
                warningModal.style.display = 'none';
            });
        }
    }

    const closeWarningBtn = document.getElementById('close-warning-modal');
    if (closeWarningBtn) closeWarningBtn.addEventListener('click', function () {
        const warningModal = document.getElementById('warning-modal');
        if (warningModal) warningModal.style.display = 'none';
    });

    const searchIcon = document.getElementById('search-icon');
    if (searchIcon) searchIcon.addEventListener('click', handleSearch);
    const searchInputEl = document.getElementById('search-input');
    if (searchInputEl) {
        searchInputEl.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.keyCode === 13) {
                event.preventDefault();
                handleSearch();
            }
        });
    }

    // ----- MENÚ  -----
    document.querySelectorAll('.dropdown-content a, .sub-menu a').forEach(link => {
        link.addEventListener('click', function (event) {
            const subMenu = this.nextElementSibling;
            if (subMenu && subMenu.classList.contains('sub-menu')) {
                event.preventDefault();
                subMenu.classList.toggle('active');
                return;
            }
            event.preventDefault();
            const category = this.getAttribute('data-category');
            const categoryProducts = findCategoryProducts(category, productsData);
            if (categoryProducts) openProductModal(category, categoryProducts);
            else alert('No hay productos disponibles para esta categoría.');
        });
    });

    document.querySelector('.dropdown-btn')?.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const dropdownContent = document.querySelector('.dropdown-content');
        dropdownContent?.classList.toggle('active');
        if (!dropdownContent?.classList.contains('active')) {
            document.querySelectorAll('.sub-menu').forEach(subMenu => subMenu.classList.remove('active'));
        }
    });

    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const productDropdown = document.querySelector('.dropdown');
    const dropdownBtn = productDropdown?.querySelector('.dropdown-btn');

    menuIcon?.addEventListener('click', function () {
        navMenu?.classList.toggle('show');
        productDropdown?.classList.remove('show');
    });
    dropdownBtn?.addEventListener('click', function (event) {
        event.preventDefault();
        productDropdown?.classList.toggle('show');
    });

    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function () {
            if (!this.classList.contains('dropdown-btn')) navMenu?.classList.remove('show');
        });
    });

    document.addEventListener('click', function (event) {
        if (!navMenu?.contains(event.target) &&
            !menuIcon?.contains(event.target) &&
            !productDropdown?.contains(event.target)) {
            navMenu?.classList.remove('show');
        }
    });

    // scroll a promociones
    const promocionesLink = document.querySelector('a[href="#promociones"]');
    promocionesLink?.addEventListener('click', function (event) {
        event.preventDefault();
        const promocionesSection = document.getElementById('promociones');
        if (promocionesSection) window.scrollTo({ top: promocionesSection.offsetTop - 50, behavior: 'smooth' });
    });

    // ----- TURNOS -----
    const turnosModal = document.getElementById("turnos-modal");
    const openTurnos = document.getElementById("open-turnos");
    const closeTurnos = document.getElementById("close-turnos");
    const turnosImage = document.getElementById('turnos-image');

    openTurnos?.addEventListener("click", (e) => {
        e.preventDefault();
        const imagePath = 'imagenes/turnos.jpg';
        if (turnosImage) turnosImage.src = imagePath;

        if (turnosImage) {
            turnosImage.onload = () => { if (turnosModal) { turnosModal.style.display = 'flex'; body.classList.add('no-scroll'); } };
            turnosImage.onerror = () => { console.error('Error al cargar la imagen de turnos.'); alert('No se pudo cargar la imagen de turnos.'); };
        } else {
            if (turnosModal) { turnosModal.style.display = 'flex'; body.classList.add('no-scroll'); }
        }
    });

    closeTurnos?.addEventListener("click", () => { if (turnosModal) turnosModal.style.display = 'none'; body.classList.remove('no-scroll'); });
    turnosModal?.addEventListener("click", (e) => { if (e.target === turnosModal) { turnosModal.style.display = 'none'; body.classList.remove('no-scroll'); } });

    function findCategoryProducts(category, data) {
        for (let key in data) {
            if (key === category) return data[key];
            if (typeof data[key] === 'object') {
                const found = findCategoryProducts(category, data[key]);
                if (found) return found;
            }
        }
        return null;
    }

}); 
