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

    window.moveSlide = moveSlide;

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

    const promocionesLink = document.querySelector('a[href="#promociones"]');
    promocionesLink?.addEventListener('click', function (event) {
        event.preventDefault();
        const promocionesSection = document.getElementById('promociones');
        if (promocionesSection) window.scrollTo({ top: promocionesSection.offsetTop - 50, behavior: 'smooth' });
    });


    const modal = document.getElementById('product-modal');
    const body = document.body;

    let closeModalButton = null;
    if (modal) closeModalButton = modal.querySelector('.closeProd-modal');

    // ----- CARRITO DE COMPRAS -----
    let cart = [];

    function updateCartCount() {
        const countEl = document.getElementById('cart-count');
        if (!countEl) return;

        const totalUnits = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

        countEl.textContent = totalUnits;
    }


    function addToCart(product) {
        const existing = cart.find(p => p.descripcion === product.descripcion);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            product.quantity = 1;
            product.precio = product.precio || 0;
            cart.push(product);
        }
        updateCartCount();
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }

    function getCartTotal() {
        return cart.reduce((total, p) => total + (p.precio || 0) * (p.quantity || 1), 0);
    }

    function showCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Tu carrito está vacío.';
            li.classList.add('empty-cart');
            cartItems.appendChild(li);

            const totalEl = document.getElementById('cart-total');
            if (totalEl) totalEl.textContent = `$0`;

            return;
        }

        cart.forEach((p, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');

            const img = document.createElement('img');
            img.src = p.imagen;
            img.alt = p.descripcion;
            img.classList.add('cart-item-image');

            const info = document.createElement('div');
            info.classList.add('cart-item-info');

            const desc = document.createElement('span');
            desc.textContent = p.descripcion.length > 40 ? p.descripcion.slice(0, 40) + '…' : p.descripcion;
            desc.classList.add('cart-item-text');

            const price = document.createElement('span');
            price.textContent = `$${(p.precio || 0).toLocaleString('es-AR')}`;
            price.classList.add('cart-item-price');

            info.appendChild(desc);
            info.appendChild(price);

            const controlsContainer = document.createElement('div');
            controlsContainer.classList.add('cart-controls');

            const minus = document.createElement('button');
            minus.textContent = '−';
            minus.classList.add('qty-btn');
            minus.addEventListener('click', () => {
                if (p.quantity > 1) p.quantity--;
                else cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                showCart();
                updateCartCount();
            });

            const qty = document.createElement('span');
            qty.textContent = p.quantity || 1;
            qty.classList.add('qty-display');

            const plus = document.createElement('button');
            plus.textContent = '+';
            plus.classList.add('qty-btn');
            plus.addEventListener('click', () => {
                p.quantity = (p.quantity || 1) + 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                showCart();
                updateCartCount();
            });

            const remove = document.createElement('button');
            remove.innerHTML = '<i class="fas fa-trash"></i>';
            remove.classList.add('remove-item-btn');
            remove.addEventListener('click', () => {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                showCart();
                updateCartCount();
            });

            controlsContainer.appendChild(minus);
            controlsContainer.appendChild(qty);
            controlsContainer.appendChild(plus);
            controlsContainer.appendChild(remove);

            li.appendChild(img);
            li.appendChild(info);
            li.appendChild(controlsContainer);

            cartItems.appendChild(li);
        });

        const totalEl = document.getElementById('cart-total');
        if (totalEl) totalEl.textContent = `$${getCartTotal().toLocaleString('es-AR')}`;
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

    document.addEventListener('click', (event) => {
        const cartIcon = document.getElementById('cart-icon');
        const cartModal = document.getElementById('cart-modal');

        if (!cartModal.classList.contains('active')) return;

        if (cartModal.contains(event.target) || cartIcon.contains(event.target)) return;

        if (event.target.closest('.cart-buttons') || event.target.closest('.qty-btn') || event.target.closest('.remove-item-btn')) return;

        cartModal.classList.remove('active');
    });



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

            const priceElement = document.createElement('p');
            priceElement.classList.add('product-price');
            priceElement.textContent = `$${(product.precio || 0).toLocaleString('es-AR')}`;

            const addButton = document.createElement('button');
            addButton.textContent = 'Agregar al carrito';
            addButton.classList.add('add-to-cart');

            addButton.addEventListener('click', () => {
                if (addButton.parentElement.querySelector('.qty-selector')) return;

                const qtyContainer = document.createElement('div');
                qtyContainer.classList.add('qty-selector');

                const minusBtn = document.createElement('button');
                minusBtn.textContent = '−';
                minusBtn.classList.add('qty-btn');

                const qtyDisplay = document.createElement('span');
                qtyDisplay.textContent = '1';
                qtyDisplay.classList.add('qty-display');

                const plusBtn = document.createElement('button');
                plusBtn.textContent = '+';
                plusBtn.classList.add('qty-btn');

                let qty = 1;
                minusBtn.addEventListener('click', () => {
                    if (qty > 1) {
                        qty--;
                        qtyDisplay.textContent = qty;
                    }
                });
                plusBtn.addEventListener('click', () => {
                    qty++;
                    qtyDisplay.textContent = qty;
                });

                addButton.replaceWith(qtyContainer);
                qtyContainer.append(minusBtn, qtyDisplay, plusBtn);

                const confirmBtn = document.createElement('button');
                confirmBtn.textContent = '✓';
                confirmBtn.classList.add('confirm-add');
                qtyContainer.append(confirmBtn);

                confirmBtn.addEventListener('click', () => {
                    for (let i = 0; i < qty; i++) addToCart(product);
                    qtyContainer.replaceWith(addButton);
                });
            });
            productDiv.appendChild(addButton);


            productDiv.appendChild(imgElement);
            productDiv.appendChild(descElement);
            productDiv.appendChild(priceElement);
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
    }

    if (modal) {
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                body.style.overflow = '';
            }
        });
    }



    // ----- BASE DE DATOS DE PRODUCTOS -----
    const productsData = {
        'Accesorios y Regalería': {
            'Aros': [
                { imagen: 'imagenes/acc1.jpg', descripcion: 'Aros de acero quirírgico. Frutillas', precio:4000 },
                { imagen: 'imagenes/acc2.jpg', descripcion: 'Aros de acero quirírgico. Ballenas', precio:4000 },
                { imagen: 'imagenes/acc3.jpg', descripcion: 'Aros de acero quirírgico. Elefantes', precio:4000 },
                { imagen: 'imagenes/acc4.jpg', descripcion: 'Aros de acero quirírgico. Luna', precio:4000 },
                { imagen: 'imagenes/acc5.jpg', descripcion: 'Aros de acero quirírgico', precio:4000 }
            ],
            'Pulseras': [
                { imagen: 'imagenes/acc13.jpg', descripcion: 'Pulsera de acero. Mariposa', precio:4000 },
                { imagen: 'imagenes/acc14.jpg', descripcion: 'Pulsera de acero.', precio:4000 },
                { imagen: 'imagenes/acc15.jpg', descripcion: 'Pulsera de acero.Hojas', precio:4000 },
                { imagen: 'imagenes/acc16.jpg', descripcion: 'Pulsera de acero. Rombos', precio:4000 }
            ],
            'Collares': [
                { imagen: 'imagenes/acc20.jpg', descripcion: 'Collar de acero. Oso', precio:4000 },
                { imagen: 'imagenes/acc21.jpg', descripcion: 'Collar de acero. Corazón rojo', precio:4000 },
                { imagen: 'imagenes/acc22.jpg', descripcion: 'Collar de acero. Corazón', precio:4000 },
                { imagen: 'imagenes/acc23.jpg', descripcion: 'Collar de acero. Oso celeste y rosa', precio:4000 }
            ],
            'Neceser': [
                { imagen: 'imagenes/acc12.jpg', descripcion: 'Neceser. Rosa y negro', precio:4000 },
                { imagen: 'imagenes/acc55.jpg', descripcion: 'Neceser. Efecto galaxia', precio:4000 },
                { imagen: 'imagenes/acc56.jpg', descripcion: 'Neceser. Rosado con textura', precio:4000 }
            ]
        },
        'Electro medicina': [
            { imagen: 'imagenes/elc2.jpg', descripcion: 'Tensiometro aneroide con estetoscopio', precio:4000 },
            { imagen: 'imagenes/elc3.jpg', descripcion: 'Lupa de escala y guía sw agujas para jeringas de insulina', precio:4000 },
            { imagen: 'imagenes/elc4.jpg', descripcion: 'FreeStyle Optium. Sistema de monitoreo de glocosa y cetonas en sangre', precio:4000 },
            { imagen: 'imagenes/elc5.jpg', descripcion: 'FreeStyle Optium Neo. Sistema de monitoreo de glocosa y cetonas en sangre', precio:4000 },
            { imagen: 'imagenes/elc1.jpg', descripcion: 'Cámara espaciadora valvulada', precio:4000 },
            { imagen: 'imagenes/fit38.jpg', descripcion: 'Masajeador', precio:4000 }
        ],
        'Fitness & Movimiento': {
            'Venda, fajas e inmovilizadores': [
                { imagen: 'imagenes/fit1.jpg', descripcion: 'Cabestrillo Dobre Tira negro', precio:4000 },
                { imagen: 'imagenes/fit2.jpg', descripcion: 'Cabestrillo faja universal', precio:4000 },
                { imagen: 'imagenes/fit3.jpg', descripcion: 'Chincha rotuliana universal', precio:4000 },
                { imagen: 'imagenes/fit4.jpg', descripcion: 'Codera Neoprene con banda de ajuste', precio:4000 },
                { imagen: 'imagenes/fit5.jpg', descripcion: 'Codera Neoprene tenista', precio:4000 }
            ],
            'Cremas': [
                { imagen: 'imagenes/fit31.jpg', descripcion: 'Atomo desinflamante clásico 220gr', precio:4000 },
                { imagen: 'imagenes/fit32.jpg', descripcion: 'Atomo desinflamante 110gr', precio:4000 },
                { imagen: 'imagenes/fit33.jpg', descripcion: 'Bengue desinflamante', precio:4000 }
            ],
        },
        'Suplementos, Vitaminas y Productos naturales': {
            'Vitaminas': [
                { imagen: 'imagenes/vit1.jpg', descripcion: 'Colágeno', precio:4000 },
                { imagen: 'imagenes/vit2.jpg', descripcion: 'Megacistin max', precio:4000 },
                { imagen: 'imagenes/vit3.jpg', descripcion: 'Cabello, piel y uñas', precio:4000 },
                { imagen: 'imagenes/vit4.jpg', descripcion: 'Omegan', precio:4000 },
                { imagen: 'imagenes/vit5.jpg', descripcion: 'Lecitina 1200', precio:4000 }
            ],
            'Suplementos': [
                { imagen: 'imagenes/sup.jpg', descripcion: 'BCAA. Suplemento dietario a base de aminoacidos ramificados, vitamina C, B2 y B6', precio:4000 },
                { imagen: 'imagenes/sup2.jpg', descripcion: 'Creatine. Suplemento dietario a base de monohidrato de creatina', precio:4000 },
                { imagen: 'imagenes/sup3.jpg', descripcion: 'Energy gel. Repositor energético. +3 cafeína, taurina ginseng. Sabor a frutos rojos', precio:4000 },
                { imagen: 'imagenes/sup4.jpg', descripcion: 'Energy gel. Repositor energético. +4 L-valina, L-leucina, L-isoleucinal, L-glutamina. Sabor a frutos rojos', precio:4000 },
                { imagen: 'imagenes/sup5.jpg', descripcion: 'Glutamine. Suplemento dietario a base de L-glutamina', precio:4000 },
                { imagen: 'imagenes/sup6.jpg', descripcion: 'Multi vitaminico y mineral. Suplemento dietario a base de vitaminas y minerales', precio:4000 },
                { imagen: 'imagenes/sup7.jpg', descripcion: 'Pre workout energy', precio:4000 }
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

        // eliminar imagenes duplicadas
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

            // Si tiene un submenú, solo lo despliega/oculta
            if (subMenu && subMenu.classList.contains('sub-menu')) {
                event.preventDefault();
                subMenu.classList.toggle('active');
                return;
            }

            // Si es una categoría final
            event.preventDefault();
            const category = this.getAttribute('data-category');
            const categoryProducts = findCategoryProducts(category, productsData);

            if (categoryProducts) {
                openProductModal(category, categoryProducts);

                // 🔹 Cerrar menú y submenús
                const navMenu = document.getElementById('nav-menu');
                if (navMenu) navMenu.classList.remove('show');

                document.querySelectorAll('.sub-menu.active').forEach(menu => {
                    menu.classList.remove('active');
                });

                // También cerramos el dropdown principal (por estética)
                const dropdownContent = document.querySelector('.dropdown-content');
                if (dropdownContent) dropdownContent.classList.remove('active');
            } else {
                alert('No hay productos disponibles para esta categoría.');
            }
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
