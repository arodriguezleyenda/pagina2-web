document.addEventListener("DOMContentLoaded", function() {
    // Variables globales
    let currentSlide = 0;
    let isTransitioning = false; // Estado para evitar múltiples transiciones simultáneas
    const slides = document.querySelectorAll('.promocion');
    const totalSlides = slides.length;
    const slider = document.querySelector('.slider');


    // Función para mover el slider
    function moveSlide(step) {
        if (isTransitioning) return; // Evita transiciones múltiples
        isTransitioning = true;

        currentSlide = (currentSlide + step + totalSlides) % totalSlides;
        const offset = -currentSlide * 100;
        slider.style.transition = "transform 0.2s ease-in-out";
        slider.style.transform = `translateX(${offset}%)`;

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
      
    // Asignar los eventos de clic a los botones de navegación del slider
    document.querySelector('.prev').addEventListener('click', function() {
        moveSlide(-1);
        resetAutoSlide();
    });
    document.querySelector('.next').addEventListener('click', function() {
        moveSlide(1);
        resetAutoSlide();
    });

    // Función para cambiar las imágenes automáticamente cada 5 segundos
    function autoSlide() {
        moveSlide(1);
    }

    // Configurar intervalo para cambio automático de imágenes
    let slideInterval = setInterval(autoSlide, 3000);

    // Reiniciar el intervalo cuando se hace clic en los botones
    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 5000);
    }

    // Función para normalizar el texto (eliminar tildes y poner en minúsculas)
    function normalizeText(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Obtener el modal y el botón de cierre
    const modal = document.getElementById('product-modal');
    const closeModalButton = modal.querySelector('.close-modal');
    const body = document.body;


    // --- CARRITO DE COMPRAS ---
    let cart = [];

    // --- FUNCIONES DE CARRITO ---
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

    // Mostrar carrito con imágenes, texto y botón de eliminar
    function showCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Tu carrito está vacío.';
            li.classList.add('empty-cart');
            cartItems.appendChild(li);
        } else {
            cart.forEach((p, i) => {
                const li = document.createElement('li');
                li.classList.add('cart-item');

                // Imagen
                const img = document.createElement('img');
                img.src = p.imagen;
                img.alt = p.descripcion;
                img.classList.add('cart-item-image');

                // Texto
                const span = document.createElement('span');
                span.textContent = p.descripcion;
                span.classList.add('cart-item-text');

                // Botón eliminar individual
                const btn = document.createElement('button');
                btn.innerHTML = '<i class="fas fa-trash"></i>';
                btn.classList.add('remove-btn');
                btn.title = 'Eliminar este producto';
                btn.addEventListener('click', () => removeFromCart(i));

                li.appendChild(img);
                li.appendChild(span);
                li.appendChild(btn);
                cartItems.appendChild(li);
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }


    function removeFromCart(index) {
        cart.splice(index, 1);
        showCart();
        updateCartCount();
    }

    // --- EVENTOS DEL CARRITO ---
    window.addEventListener('load', () => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = savedCart;
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

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }

    if (clearCart) {
        clearCart.addEventListener('click', () => {
            cart = [];
            localStorage.removeItem('cart');
            showCart();
            updateCartCount();
        });
    }

    // Evento del botón "Comprar"
    if (buyCart) {
        buyCart.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("Tu carrito está vacío 😕");
            } else {
                alert("Gracias por tu compra 🛍️");
                cart = [];
                localStorage.removeItem('cart');
                showCart();
                updateCartCount();
                cartModal.classList.remove('active');
            }
        });
    }




    // Función para abrir el modal con productos
    function openProductModal(category, products) {
        const title = document.getElementById('category-title');
        const productImagesContainer = document.getElementById('product-images');

        // Restablecer el scroll de la ventana principal (página) al principio
        window.scrollTo(0, 0); // Asegura que la página se desplace al principio de la página

        // Mostrar el modal
        modal.style.display = 'flex';

        // Asignar el título de la categoría
        title.textContent = category;

        // Limpiar el contenido previo de los productos
        productImagesContainer.innerHTML = '';

        // Mostrar los productos encontrados en el modal
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');

            const imgElement = document.createElement('div');
            imgElement.classList.add('product-image');
            imgElement.style.backgroundImage = `url('${product.imagen}')`;

            const descElement = document.createElement('p');
            descElement.classList.add('product-description');
            descElement.textContent = product.descripcion;

            productDiv.appendChild(imgElement);
            productDiv.appendChild(descElement);
            productImagesContainer.appendChild(productDiv);

            const addButton = document.createElement('button');
            addButton.textContent = 'Agregar al carrito';
            addButton.classList.add('add-to-cart');
            addButton.addEventListener('click', () => addToCart(product));

            productDiv.appendChild(addButton);
        });



        // Restablecer el scroll del modal (en caso de que haya contenido desplazable dentro)
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0; // Asegura que el scroll interno del modal también se restablezca
        }

        // Bloquear el scroll del body para que no se mueva la página principal mientras el modal está abierto
        body.style.overflow = 'hidden'; // Bloquea el scroll de la página
    }

    // Función para cerrar el modal
    closeModalButton.addEventListener('click', function () {
        modal.style.display = 'none'; // Cerrar el modal
        body.style.overflow = ''; // Restaurar el scroll de la página principal
    });

    // Agregar un evento de cierre si el usuario hace clic fuera del modal
    modal.addEventListener('click', function (event) {
        // Verificar si el clic fue fuera del contenido del modal
        if (event.target === modal) {
            modal.style.display = 'none';
            body.classList.remove('no-scroll'); // Deshabilitar la clase no-scroll
        }
    });

    // Datos de productos por categoría
    const productsData = {
        'Accesorios y Regalería': {
            'Aros': [
                { imagen: 'imagenes/acc1.jpg', descripcion: 'Aros de acero quirírgico. Frutillas', mas: 'aros' },
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

    function handleSearch() {
        const searchInput = document.getElementById('search-input').value.trim();
        if (!searchInput) {
            alert('Por favor, ingrese un término de búsqueda.');
            return;
        }
    
        const searchTerm = normalizeText(searchInput); // Normalizar el texto ingresado
        let filteredProducts = [];
    
        // Función para buscar recursivamente en todas las categorías y subcategorías
        function searchProducts(categoryData) {
            Object.keys(categoryData).forEach(category => {
                const data = categoryData[category];
    
                if (Array.isArray(data)) {
                    // Si es un array, buscar en las descripciones de los productos
                    const matchingProducts = data.filter(product =>
                        normalizeText(product.descripcion).includes(searchTerm)
                    );
                    if (matchingProducts.length > 0) {
                        filteredProducts = [...filteredProducts, ...matchingProducts];
                    }
                } else if (typeof data === 'object') {
                    // Si es un objeto, hacer una búsqueda recursiva en la subcategoría
                    searchProducts(data);
                }
            });
        }
    
        // Iniciar la búsqueda en `productsData`
        searchProducts(productsData);
    
        // Eliminar productos con imágenes repetidas
        const imagenesUnicas = new Set();
        filteredProducts = filteredProducts.filter(product => {
            if (!imagenesUnicas.has(product.imagen)) {
                imagenesUnicas.add(product.imagen);
                return true;
            }
            return false;
        });
    
        // Cerrar el modal de advertencia antes de continuar
        const warningModal = document.getElementById('warning-modal');
        if (warningModal) warningModal.style.display = 'none';
    
        // Mostrar los productos encontrados o un mensaje si no hay coincidencias
        if (filteredProducts.length > 0) {
            openProductModal('Resultados de búsqueda', filteredProducts);
        } else {
            openWarningModal(); // Abrir el modal de advertencia si no se encuentran productos
        }
    
        document.getElementById('search-input').value = '';
    }    

    // Función para cerrar el modal de advertencia
    document.getElementById('close-warning-modal').addEventListener('click', function () {
        const warningModal = document.getElementById('warning-modal');
        warningModal.style.display = 'none'; // Ocultar el modal cuando se hace clic en la cruz
    });

    // Evento de búsqueda al hacer clic en el ícono
    document.getElementById('search-icon').addEventListener('click', handleSearch);

    // Evento de búsqueda al presionar "Enter" o "Listo" en dispositivos móviles
    document.getElementById('search-input').addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault(); // Evita el comportamiento predeterminado en formularios
            handleSearch();  // Ejecuta la búsqueda
        }
    });

    document.querySelectorAll('.dropdown-content a, .sub-menu a').forEach(link => {
        link.addEventListener('click', function (event) {
            const subMenu = this.nextElementSibling; // Buscar si hay un submenú asociado
    
            // Si el enlace tiene un submenú, solo lo despliega y no abre el modal
            if (subMenu && subMenu.classList.contains('sub-menu')) {
                event.preventDefault(); // Evita la navegación
                subMenu.classList.toggle('active'); // Abre/cierra el submenú
                return; // Sale de la función para no mostrar el modal
            }
    
            event.preventDefault(); // Evita navegación en enlaces normales
    
            const category = this.getAttribute('data-category'); // Obtener la categoría
            let categoryProducts = findCategoryProducts(category, productsData); // Buscar productos en cualquier nivel
    
            if (categoryProducts) {
                openProductModal(category, categoryProducts); // Abre el modal con productos
            } else {
                alert('No hay productos disponibles para esta categoría.');
            }
        });
    });

    document.querySelector('.dropdown-btn').addEventListener('click', function (event) {
        event.preventDefault(); // Evita la navegación del enlace
        event.stopPropagation(); // Evita que cierre los submenús si solo se está abriendo el menú hamburguesa
    
        const dropdownContent = document.querySelector('.dropdown-content');
        dropdownContent.classList.toggle('active'); // Alternar visibilidad del menú
    
        // Solo cerrar submenús si el menú se está ocultando
        if (!dropdownContent.classList.contains('active')) {
            document.querySelectorAll('.sub-menu').forEach(subMenu => {
                subMenu.classList.remove('active');
            });
        }
    });

    function findCategoryProducts(category, data) {
        for (let key in data) {
            if (key === category) {
                return data[key]; // Retorna los productos si encuentra la categoría exacta
            }
            if (typeof data[key] === 'object') {
                const found = findCategoryProducts(category, data[key]); // Busca dentro de subcategorías
                if (found) return found;
            }
        }
        return null; // Retorna null si no encuentra la categoría
    }

    // Manejo del menú desplegable (icono hamburguesa)
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const productDropdown = document.querySelector('.dropdown');
    const dropdownBtn = productDropdown.querySelector('.dropdown-btn');

    menuIcon.addEventListener('click', function () {
        navMenu.classList.toggle('show'); // Alterna la visibilidad del menú
        productDropdown.classList.remove('show'); // Oculta el desplegable de productos
    });

    dropdownBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto
        productDropdown.classList.toggle('show'); // Muestra/Oculta el desplegable de productos
    });

       
    // Cerrar el menú cuando se hace clic en cualquier opción (excepto "Productos")
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            // Solo cerrar el menú si el clic no es en "Productos"
            if (!this.classList.contains('dropdown-btn')) {
                navMenu.classList.remove('show'); // Cierra el menú de navegación
            }
        });
    });

    // Opcional: Si quieres cerrar el menú cuando se hace clic fuera de él
    document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    // Verifica que el clic no sea ni en el menú ni en el icono
    if (!navMenu.contains(event.target) && !menuIcon.contains(event.target) && !productDropdown.contains(event.target)) {
        navMenu.classList.remove('show'); // Cierra el menú de navegación
    }
    });

    // Manejo del desplazamiento hacia promociones
    const promocionesLink = document.querySelector('a[href="#promociones"]');

    promocionesLink.addEventListener('click', function (event) {
        event.preventDefault();  // Prevenir el comportamiento por defecto (salto inmediato)
        
        // Desplazarse 50px antes de la sección 'Promociones'
        const promocionesSection = document.getElementById('promociones');
        window.scrollTo({
            top: promocionesSection.offsetTop - 50,  // Ajuste de desplazamiento hacia arriba
            behavior: 'smooth'  // Desplazamiento suave
        });
    });

    // Manejo del modal de "Turnos"
    const turnosModal = document.getElementById("turnos-modal");
    const openTurnos = document.getElementById("open-turnos");
    const closeTurnos = document.getElementById("close-turnos");
    const turnosImage = document.getElementById('turnos-image');

    openTurnos.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Aseguramos que la imagen se establece correctamente y se visualiza en el modal
        const imagePath = 'imagenes/turnos.jpg'; // Cambia esta ruta si la imagen está en otro directorio
        turnosImage.src = imagePath; // Establece la fuente de la imagen
        turnosImage.onload = () => {
            // Solo mostramos el modal si la imagen se cargó correctamente
            turnosModal.style.display = 'flex';
            body.classList.add('no-scroll'); // Bloquear el scroll de la página principal
        };
        turnosImage.onerror = () => {
            console.error('Error al cargar la imagen de turnos.');
            alert('No se pudo cargar la imagen de turnos.');
        };
    });

    closeTurnos.addEventListener("click", () => {
        turnosModal.style.display = 'none'; // Cerrar el modal al hacer clic en el botón
        body.classList.remove('no-scroll'); // Restaurar el scroll de la página principal
    });

    turnosModal.addEventListener("click", (e) => {
        if (e.target === turnosModal) {
            turnosModal.style.display = 'none'; // Cerrar el modal al hacer clic fuera de él
            body.classList.remove('no-scroll'); // Restaurar el scroll de la página principal
        }
    });


    promocionesLink.addEventListener('click', function (event) {
        event.preventDefault();

        const promocionesSection = document.getElementById('promociones');
        window.scrollTo({
            top: promocionesSection.offsetTop - 50,
            behavior: 'smooth'
        });
    });

});
    
