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
                { imagen: 'acc1.jpg', descripcion: 'Aros de acero quirírgico. Frutillas', mas: 'aros' },
                { imagen: 'acc2.jpg', descripcion: 'Aros de acero quirírgico. Ballenas' },
                { imagen: 'acc3.jpg', descripcion: 'Aros de acero quirírgico. Elefantes' },
                { imagen: 'acc4.jpg', descripcion: 'Aros de acero quirírgico. Luna' },
                { imagen: 'acc5.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc6.jpg', descripcion: 'Aros de acero quirírgico. Estrellas' },
                { imagen: 'acc7.jpg', descripcion: 'Aros de acero quirírgico. Serpiente' },
                { imagen: 'acc8.jpg', descripcion: 'Aros de acero quirírgico. Corazón' },
                { imagen: 'acc9.jpg', descripcion: 'Aros de acero quirírgico. Lunas' },
                { imagen: 'acc10.jpg', descripcion: 'Aros de acero quirírgico. Corazones' },
                { imagen: 'acc11.jpg', descripcion: 'Aros de acero quirírgico. Colgantes' },
                { imagen: 'acc17.jpg', descripcion: 'Aros de acero quirírgico. Serpientes' },
                { imagen: 'acc18.jpg', descripcion: 'Aros colgantes de acero quirírgico' },
                { imagen: 'acc19.jpg', descripcion: 'Aros de acero quirírgico. Astronauta' },
                { imagen: 'acc34.jpg', descripcion: 'Aros de acero quirírgico. Saturno' },
                { imagen: 'acc35.jpg', descripcion: 'Aros de acero quirírgico. Triángulo' },
                { imagen: 'acc36.jpg', descripcion: 'Aros de acero quirírgico. Triángulo' },
                { imagen: 'acc37.jpg', descripcion: 'Aros de acero quirírgico. Corazones' },
                { imagen: 'acc38.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc39.jpg', descripcion: 'Aros de acero quirírgico. Lunas' },
                { imagen: 'acc40.jpg', descripcion: 'Aros de acero quirírgico. Flor' },
                { imagen: 'acc41.jpg', descripcion: 'Aros de acero quirírgico. Flor' },
                { imagen: 'acc42.jpg', descripcion: 'Aros de acero quirírgico. Corazón' },
                { imagen: 'acc43.jpg', descripcion: 'Aros de acero quirírgico. Corazón' },
                { imagen: 'acc44.jpg', descripcion: 'Aros de acero quirírgico. Estrellas' },
                { imagen: 'acc45.jpg', descripcion: 'Aros de acero quirírgico. Estrellas marinas' },
                { imagen: 'acc46.jpg', descripcion: 'Aros de acero quirírgico. Corazón' },
                { imagen: 'acc47.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc48.jpg', descripcion: 'Aros de acero quirírgico. Luna' },
                { imagen: 'acc49.jpg', descripcion: 'Aros de acero quirírgico. Triángulo' },
                { imagen: 'acc50.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc51.jpg', descripcion: 'Aros de acero quirírgico. Corazón' },
                { imagen: 'acc52.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc53.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc54.jpg', descripcion: 'Aros de acero quirírgico' }
            ],
            'Pulseras': [
                { imagen: 'acc13.jpg', descripcion: 'Pulsera de acero. Mariposa' },
                { imagen: 'acc14.jpg', descripcion: 'Pulsera de acero.' },
                { imagen: 'acc15.jpg', descripcion: 'Pulsera de acero.Hojas' },
                { imagen: 'acc16.jpg', descripcion: 'Pulsera de acero. Rombos' }
            ],
            'Collares': [
                { imagen: 'acc20.jpg', descripcion: 'Collar de acero. Oso' },
                { imagen: 'acc21.jpg', descripcion: 'Collar de acero. Corazón rojo' },
                { imagen: 'acc22.jpg', descripcion: 'Collar de acero. Corazón' },
                { imagen: 'acc23.jpg', descripcion: 'Collar de acero. Oso celeste y rosa' },
                { imagen: 'acc24.jpg', descripcion: 'Collar de acero. Oso rosa' },
                { imagen: 'acc25.jpg', descripcion: 'Collar de acero. Estrella' },
                { imagen: 'acc26.jpg', descripcion: 'Collar de acero. Estrella' },
                { imagen: 'acc27.jpg', descripcion: 'Collar de acero. Luna' },
                { imagen: 'acc28.jpg', descripcion: 'Collar de acero. Luna' },
                { imagen: 'acc29.jpg', descripcion: 'Collar de acero. Corazón' },
                { imagen: 'acc30.jpg', descripcion: 'Collar de acero. Estrella' },
                { imagen: 'acc31.jpg', descripcion: 'Collar de acero' },
                { imagen: 'acc32.jpg', descripcion: 'Collar de acero. Corazón' },
                { imagen: 'acc33.jpg', descripcion: 'Collar de acero. Flor' }
            ],
            'Neceser': [
                { imagen: 'acc12.jpg', descripcion: 'Neceser. Rosa y negro' },
                { imagen: 'acc55.jpg', descripcion: 'Neceser. Efecto galaxia' },
                { imagen: 'acc56.jpg', descripcion: 'Neceser. Rosado con textura' },
                { imagen: 'acc57.jpg', descripcion: 'Neceser. Multicolor tipo acuarela con brillo' },
                { imagen: 'acc58.jpg', descripcion: 'Neceser. Graffiti' },
                { imagen: 'acc59.jpg', descripcion: 'Neceser. Fucsia tipo charol' },
                { imagen: 'acc60.jpg', descripcion: 'Neceser. Negro tipo charol' },
                { imagen: 'acc61.jpg', descripcion: 'Neceser. Blanco y negro con textura' },
                { imagen: 'acc62.jpg', descripcion: 'Neceser. Rígido. "Have a nice day"' },
                { imagen: 'acc63.jpg', descripcion: 'Neceser. "Beauty it is my style". ' },
                { imagen: 'acc64.jpg', descripcion: 'Neceser. Tornasolado. "Love"' },
                { imagen: 'acc65.jpg', descripcion: 'Neceser. Rígido. Negro y plateado' }
            ],
            'Todo en Accesorios y Regalería': [
                { imagen: 'acc1.jpg', descripcion: 'Aros de acero quirírgico. Frutillas' },
                { imagen: 'acc2.jpg', descripcion: 'Aros de acero quirírgico. Ballenas' },
                { imagen: 'acc3.jpg', descripcion: 'Aros de acero quirírgico. Elefantes' },
                { imagen: 'acc4.jpg', descripcion: 'Aros de acero quirírgico. Luna' },
                { imagen: 'acc5.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc6.jpg', descripcion: 'Aros de acero quirírgico. Estrellas' },
                { imagen: 'acc7.jpg', descripcion: 'Aros de acero quirírgico. Serpiente' },
                { imagen: 'acc8.jpg', descripcion: 'Aros de acero quirírgico. Corazón' },
                { imagen: 'acc9.jpg', descripcion: 'Aros de acero quirírgico. Lunas' },
                { imagen: 'acc10.jpg', descripcion: 'Aros de acero quirírgico. Corazones' },
                { imagen: 'acc11.jpg', descripcion: 'Aros de acero quirírgico. Colgantes' },
                { imagen: 'acc12.jpg', descripcion: 'Neceser. Rosa y negro' },
                { imagen: 'acc13.jpg', descripcion: 'Pulsera de acero. Mariposa' },
                { imagen: 'acc14.jpg', descripcion: 'Pulsera de acero.' },
                { imagen: 'acc15.jpg', descripcion: 'Pulsera de acero.Hojas' },
                { imagen: 'acc16.jpg', descripcion: 'Pulsera de acero. Rombos' },
                { imagen: 'acc17.jpg', descripcion: 'Aros de acero quirírgico. Serpientes' },
                { imagen: 'acc18.jpg', descripcion: 'Aros colgantes de acero quirírgico' },
                { imagen: 'acc19.jpg', descripcion: 'Aros de acero quirírgico. Astronauta' },
                { imagen: 'acc20.jpg', descripcion: 'Collar de acero. Oso' },
                { imagen: 'acc21.jpg', descripcion: 'Collar de acero. Corazón rojo' },
                { imagen: 'acc22.jpg', descripcion: 'Collar de acero. Corazón' },
                { imagen: 'acc23.jpg', descripcion: 'Collar de acero. Oso celeste y rosa' },
                { imagen: 'acc24.jpg', descripcion: 'Collar de acero. Oso rosa' },
                { imagen: 'acc25.jpg', descripcion: 'Collar de acero. Estrella' },
                { imagen: 'acc26.jpg', descripcion: 'Collar de acero. Estrella' },
                { imagen: 'acc27.jpg', descripcion: 'Collar de acero. Luna' },
                { imagen: 'acc28.jpg', descripcion: 'Collar de acero. Luna' },
                { imagen: 'acc29.jpg', descripcion: 'Collar de acero. Corazón' },
                { imagen: 'acc30.jpg', descripcion: 'Collar de acero. Estrella' },
                { imagen: 'acc31.jpg', descripcion: 'Collar de acero' },
                { imagen: 'acc32.jpg', descripcion: 'Collar de acero. Corazón' },
                { imagen: 'acc33.jpg', descripcion: 'Collar de acero. Flor' },
                { imagen: 'acc34.jpg', descripcion: 'Aros de acero quirírgico. Saturno' },
                { imagen: 'acc35.jpg', descripcion: 'Aros de acero quirírgico. Triángulo' },
                { imagen: 'acc36.jpg', descripcion: 'Aros de acero quirírgico. Triángulo' },
                { imagen: 'acc37.jpg', descripcion: 'Aros de acero quirírgico. Corazones' },
                { imagen: 'acc38.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc39.jpg', descripcion: 'Aros de acero quirírgico. Lunas' },
                { imagen: 'acc40.jpg', descripcion: 'Aros de acero quirírgico. Flor' },
                { imagen: 'acc41.jpg', descripcion: 'Aros de acero quirírgico. Flor' },
                { imagen: 'acc42.jpg', descripcion: 'Aros de acero quirírgico. Corazón' },
                { imagen: 'acc43.jpg', descripcion: 'Aros de acero quirírgico. Corazón' },
                { imagen: 'acc44.jpg', descripcion: 'Aros de acero quirírgico. Estrellas' },
                { imagen: 'acc45.jpg', descripcion: 'Aros de acero quirírgico. Estrellas marinas' },
                { imagen: 'acc46.jpg', descripcion: 'Aros de acero quirírgico. Corazón' },
                { imagen: 'acc47.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc48.jpg', descripcion: 'Aros de acero quirírgico. Luna' },
                { imagen: 'acc49.jpg', descripcion: 'Aros de acero quirírgico. Triángulo' },
                { imagen: 'acc50.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc51.jpg', descripcion: 'Aros de acero quirírgico. Corazón' },
                { imagen: 'acc52.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc53.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc54.jpg', descripcion: 'Aros de acero quirírgico' },
                { imagen: 'acc55.jpg', descripcion: 'Neceser. Efecto galaxia' },
                { imagen: 'acc56.jpg', descripcion: 'Neceser. Rosado con textura' },
                { imagen: 'acc57.jpg', descripcion: 'Neceser. Multicolor tipo acuarela con brillo' },
                { imagen: 'acc58.jpg', descripcion: 'Neceser. Graffiti' },
                { imagen: 'acc59.jpg', descripcion: 'Neceser. Fucsia tipo charol' },
                { imagen: 'acc60.jpg', descripcion: 'Neceser. Negro tipo charol' },
                { imagen: 'acc61.jpg', descripcion: 'Neceser. Blanco y negro con textura' },
                { imagen: 'acc62.jpg', descripcion: 'Neceser. Rígido. "Have a nice day"' },
                { imagen: 'acc63.jpg', descripcion: 'Neceser. "Beauty it is my style". ' },
                { imagen: 'acc64.jpg', descripcion: 'Neceser. Tornasolado. "Love"' },
                { imagen: 'acc65.jpg', descripcion: 'Neceser. Rígido. Negro y plateado' }
            ]
        },
        'Relax': [
            { imagen: 'rel1.jpg', descripcion: 'Sales minerales de baño' },
            { imagen: 'rel2.jpg', descripcion: 'Sales minerales de baño' },
            { imagen: 'rel3.jpg', descripcion: 'Jabón de tocador + esponja' },
            { imagen: 'rel4.jpg', descripcion: 'Jabón de tocador + esponja' },
            { imagen: 'rel5.jpg', descripcion: 'Almohada de semillas' },
            { imagen: 'fit38.jpg', descripcion: 'Masajeador' },
        ],
        'Electro medicina': [
            { imagen: 'elc2.jpg', descripcion: 'Tensiometro aneroide con estetoscopio' },
            { imagen: 'elc3.jpg', descripcion: 'Lupa de escala y guía sw agujas para jeringas de insulina' },
            { imagen: 'elc4.jpg', descripcion: 'FreeStyle Optium. Sistema de monitoreo de glocosa y cetonas en sangre' },
            { imagen: 'elc5.jpg', descripcion: 'FreeStyle Optium Neo. Sistema de monitoreo de glocosa y cetonas en sangre' },
            { imagen: 'elc1.jpg', descripcion: 'Cámara espaciadora valvulada' },
            { imagen: 'fit38.jpg', descripcion: 'Masajeador' }
        ],
        'Fitness & Movimiento': {
            'Venda, fajas e inmovilizadores': [
                { imagen: 'fit1.jpg', descripcion: 'Cabestrillo Dobre Tira negro' },
                { imagen: 'fit2.jpg', descripcion: 'Cabestrillo faja universal' },
                { imagen: 'fit3.jpg', descripcion: 'Chincha rotuliana universal' },
                { imagen: 'fit4.jpg', descripcion: 'Codera Neoprene con banda de ajuste' },
                { imagen: 'fit5.jpg', descripcion: 'Codera Neoprene tenista' },
                { imagen: 'fit6.jpg', descripcion: 'Espaldar elástico' },
                { imagen: 'fit7.jpg', descripcion: 'Faja de trabajo Worker' },
                { imagen: 'fit8.jpg', descripcion: 'Faja firme regulable' },
                { imagen: 'fit9.jpg', descripcion: 'Faja neoprene abdominal' },
                { imagen: 'fit10.jpg', descripcion: 'Faja softy plus regulable' },
                { imagen: 'fit11.jpg', descripcion: 'Gemelera de neoprene' },
                { imagen: 'fit12.jpg', descripcion: 'Inmovilizador de rodilla corto' },
                { imagen: 'fit13.jpg', descripcion: 'Muñequera abierta regulable' },
                { imagen: 'fit14.jpg', descripcion: 'Muñequera Air Sport' },
                { imagen: 'fit15.jpg', descripcion: 'Muñequera Boomerang C dedo' },
                { imagen: 'fit16.jpg', descripcion: 'Muñequera Boomerang dedo libre universal' },
                { imagen: 'fit17.jpg', descripcion: 'Muñequera inmovilizadora' },
                { imagen: 'fit18.jpg', descripcion: 'Muslera neoprene' },
                { imagen: 'fit19.jpg', descripcion: 'Rodillera Air sport' },
                { imagen: 'fit20.jpg', descripcion: 'Rodillera neoprene con apertura rotuliana' },
                { imagen: 'fit21.jpg', descripcion: 'Rodillera neoprene con refuerzo rotuliano' },
                { imagen: 'fit22.jpg', descripcion: 'Sosten maternal' },
                { imagen: 'fit23.jpg', descripcion: 'Tobillera Air sport' },
                { imagen: 'fit24.jpg', descripcion: 'Tobillera Ballenada acordonada' },
                { imagen: 'fit25.jpg', descripcion: 'Tobillera neoprene' },
                { imagen: 'fit26.jpg', descripcion: 'Valva inmovilizadora de tobillo ' },
                { imagen: 'fit27.jpg', descripcion: 'Rodillera' },
                { imagen: 'fit28.jpg', descripcion: 'Venda elástica 11cm' },
                { imagen: 'fit29.jpg', descripcion: 'Venda elástica 10cmx2,5mts' },
                { imagen: 'fit30.jpg', descripcion: 'Venda elástica 7cm' },
            ],
            'Cremas': [
                { imagen: 'fit31.jpg', descripcion: 'Atomo desinflamante clásico 220gr.' },
                { imagen: 'fit32.jpg', descripcion: 'Atomo desinflamante 110gr' },
                { imagen: 'fit33.jpg', descripcion: 'Bengue desinflamante' },
                { imagen: 'fit35.jpg', descripcion: 'Rati Salil con cannabidiol' },
                { imagen: 'fit36.jpg', descripcion: 'Actron gel' },
                { imagen: 'fit37.jpg', descripcion: 'Salicrem Forte' },
                { imagen: 'fit39.jpg', descripcion: 'Voltaren' }
            ],
            'Todo en Fitness & Movimiento': [
                { imagen: 'fit1.jpg', descripcion: 'Cabestrillo Dobre Tira negro' },
                { imagen: 'fit2.jpg', descripcion: 'Cabestrillo faja universal' },
                { imagen: 'fit3.jpg', descripcion: 'Chincha rotuliana universal' },
                { imagen: 'fit4.jpg', descripcion: 'Codera Neoprene con banda de ajuste' },
                { imagen: 'fit5.jpg', descripcion: 'Codera Neoprene tenista' },
                { imagen: 'fit6.jpg', descripcion: 'Espaldar elástico' },
                { imagen: 'fit7.jpg', descripcion: 'Faja de trabajo Worker' },
                { imagen: 'fit8.jpg', descripcion: 'Faja firme regulable' },
                { imagen: 'fit9.jpg', descripcion: 'Faja neoprene abdominal' },
                { imagen: 'fit10.jpg', descripcion: 'Faja softy plus regulable' },
                { imagen: 'fit11.jpg', descripcion: 'Gemelera de neoprene' },
                { imagen: 'fit12.jpg', descripcion: 'Inmovilizador de rodilla corto' },
                { imagen: 'fit13.jpg', descripcion: 'Muñequera abierta regulable' },
                { imagen: 'fit14.jpg', descripcion: 'Muñequera Air Sport' },
                { imagen: 'fit15.jpg', descripcion: 'Muñequera Boomerang C dedo' },
                { imagen: 'fit16.jpg', descripcion: 'Muñequera Boomerang dedo libre universal' },
                { imagen: 'fit17.jpg', descripcion: 'Muñequera inmovilizadora' },
                { imagen: 'fit18.jpg', descripcion: 'Muslera neoprene' },
                { imagen: 'fit19.jpg', descripcion: 'Rodillera Air sport' },
                { imagen: 'fit20.jpg', descripcion: 'Rodillera neoprene con apertura rotuliana' },
                { imagen: 'fit21.jpg', descripcion: 'Rodillera neoprene con refuerzo rotuliano' },
                { imagen: 'fit22.jpg', descripcion: 'Sosten maternal' },
                { imagen: 'fit23.jpg', descripcion: 'Tobillera Air sport' },
                { imagen: 'fit24.jpg', descripcion: 'Tobillera Ballenada acordonada' },
                { imagen: 'fit25.jpg', descripcion: 'Tobillera neoprene' },
                { imagen: 'fit26.jpg', descripcion: 'Valva inmovilizadora de tobillo ' },
                { imagen: 'fit27.jpg', descripcion: 'Rodillera' },
                { imagen: 'fit28.jpg', descripcion: 'Venda elástica 11cm' },
                { imagen: 'fit29.jpg', descripcion: 'Venda elástica 10cmx2,5mts' },
                { imagen: 'fit30.jpg', descripcion: 'Venda elástica 7cm' },
                { imagen: 'fit31.jpg', descripcion: 'Atomo desinflamante clásico 220gr.' },
                { imagen: 'fit32.jpg', descripcion: 'Atomo desinflamante 110gr' },
                { imagen: 'fit33.jpg', descripcion: 'Bengue desinflamante' },
                { imagen: 'fit35.jpg', descripcion: 'Rati Salil con cannabidiol' },
                { imagen: 'fit36.jpg', descripcion: 'Actron gel' },
                { imagen: 'fit37.jpg', descripcion: 'Salicrem Forte' },
                { imagen: 'fit39.jpg', descripcion: 'Voltaren' }
            ],
        },
        'Higiene y cuidado personal': [
            { imagen: 'hcp1.jpg', descripcion: 'Carefree todos los días' },
            { imagen: 'hcp2.jpg', descripcion: 'Carefree todos los días tanga' },
            { imagen: 'hcp3.jpg', descripcion: 'Carefree protección largos' },
            { imagen: 'hcp4.jpg', descripcion: 'Carefree protección' },
            { imagen: 'hcp5.jpg', descripcion: 'Siempre Libre normal suave ' },
            { imagen: 'hcp6.jpg', descripcion: 'Siempre Libre adapt plus ultrafina suave' },
            { imagen: 'hcp7.jpg', descripcion: 'Doncella normal' },
            { imagen: 'hcp8.jpg', descripcion: 'Doncella protectores diarios' },
            { imagen: 'hcp9.jpg', descripcion: 'Nosotras clásica' },
            { imagen: 'hcp10.jpg', descripcion: 'Viasek Toallitas húmedas intimas femeninas' },
            { imagen: 'hcp11.jpg', descripcion: 'EVACOPA talle 3' },
            { imagen: 'hcp12.jpg', descripcion: 'EVACOPA talle 2' },
            { imagen: 'hcp13.jpg', descripcion: 'EVACOPA talle 1' },
            { imagen: 'hcp14.jpg', descripcion: 'o.b. mini' },
            { imagen: 'hcp15.jpg', descripcion: 'o.b. medio' },
            { imagen: 'hcp16.jpg', descripcion: 'o.b. super' },
            { imagen: 'hcp17.jpg', descripcion: 'CUTEX quitaesmalte fortalecedor' },
            { imagen: 'hcp18.jpg', descripcion: 'CUTEX quitaesmalte hipoalergénico' },
            { imagen: 'hcp19.jpg', descripcion: 'Veet kit de depilación facial' }

        ],
        'Suplementos, Vitaminas y Productos naturales': {
            'Vitaminas': [
                { imagen: 'vit1.jpg', descripcion: 'Colágeno' },
                { imagen: 'vit2.jpg', descripcion: 'Megacistin max' },
                { imagen: 'vit3.jpg', descripcion: 'Cabello, piel y uñas' },
                { imagen: 'vit4.jpg', descripcion: 'Omegan' },
                { imagen: 'vit5.jpg', descripcion: 'Lecitina 1200' },
                { imagen: 'vit6.jpg', descripcion: 'Isoflavonas de soja' },
                { imagen: 'vit7.jpg', descripcion: 'Ginkgo 80' },
                { imagen: 'vit8.jpg', descripcion: 'Chía. Omega 3' },
                { imagen: 'vit9.jpg', descripcion: 'Guaraná, con polen y vitamina E' },
                { imagen: 'vit10.jpg', descripcion: 'Cúrcuma + jengible. Vitaminas C y E' },
                { imagen: 'vit11.jpg', descripcion: 'Clorofila' },
                { imagen: 'vit12.jpg', descripcion: 'Vitamina B12' },
                { imagen: 'vit13.jpg', descripcion: 'Vitamina C' },
                { imagen: 'vit14.jpg', descripcion: 'Nutri 100. Vitamina E' },
                { imagen: 'vit15.jpg', descripcion: 'Vitamina D' },
                { imagen: 'vit16.jpg', descripcion: 'Vitamina D3' },
                { imagen: 'vit17.jpg', descripcion: 'Curflex plus' },
                { imagen: 'vit18.jpg', descripcion: 'Curflex triple acción' },
                { imagen: 'vit19.jpg', descripcion: 'MSM artro' },
                { imagen: 'vit20.jpg', descripcion: 'Valeriana' },
                { imagen: 'vit21.jpg', descripcion: 'Serenil' },
                { imagen: 'vit22.jpg', descripcion: 'Fosfovita' },
                { imagen: 'vit23.jpg', descripcion: 'Fosfovita silver' },
                { imagen: 'vit24.jpg', descripcion: '102 mujer' },
                { imagen: 'vit25.jpg', descripcion: '102 plus' },
                { imagen: 'vit26.jpg', descripcion: 'Centrum mujer' },
                { imagen: 'vit27.jpg', descripcion: 'Centrum hombre' },
                { imagen: 'vit28.jpg', descripcion: 'Centrum silver' },
                { imagen: 'vit29.jpg', descripcion: 'Centrum base' },
                { imagen: 'vit30.jpg', descripcion: 'Redoxon. Vitamina C' },
                { imagen: 'vit31.jpg', descripcion: 'Redoxon triple acción. Vitamina D y zinc' },
                { imagen: 'vit32.jpg', descripcion: 'Redoxitos Plus. Vitamina D, vitamina C y zinc' },
                { imagen: 'vit33.jpg', descripcion: 'Supradyn forte' },
                { imagen: 'vit34.jpg', descripcion: 'Berocca Plus' },
                { imagen: 'vit35.jpg', descripcion: 'Magnesio sport' },
                { imagen: 'vit36.jpg', descripcion: 'Magnesio. Potasio y vitamina B6' },
                { imagen: 'vit37.jpg', descripcion: 'Citrato de magnesio. Vitamina D' },
                { imagen: 'vit38.jpg', descripcion: 'Quelat. Zinc, magnesio y selenio' },
                { imagen: 'vit39.jpg', descripcion: 'Spirulina siluett. Garcinia y café verde' }
            ],
            'Suplementos': [
                { imagen: 'sup.jpg', descripcion: 'BCAA. Suplemento dietario a base de aminoacidos ramificados, vitamina C, B2 y B6' },
                { imagen: 'sup2.jpg', descripcion: 'Creatine. Suplemento dietario a base de monohidrato de creatina' },
                { imagen: 'sup3.jpg', descripcion: 'Energy gel. Repositor energético. +3 cafeína, taurina ginseng. Sabor a frutos rojos ' },
                { imagen: 'sup4.jpg', descripcion: 'Energy gel. Repositor energético. +4 L-valina, L-leucina, L-isoleucinal, L-glutamina. Sabor a frutos rojos' },
                { imagen: 'sup5.jpg', descripcion: 'Glutamine. Suplemento dietario a base de L-glutamina' },
                { imagen: 'sup6.jpg', descripcion: 'Multi vitaminico y mineral. Suplemento dietario a base de vitaminas y minerales' },
                { imagen: 'sup7.jpg', descripcion: 'Pre workout energy' },
                { imagen: 'sup8.jpg', descripcion: 'Sport drink' },
                { imagen: 'sup9.jpg', descripcion: 'Whey protein bar. Sabor banana' },
                { imagen: 'sup10.jpg', descripcion: 'Whey protein bar. Sabor chocolate' },
                { imagen: 'sup11.jpg', descripcion: 'Whey protein bar. Sabor frambuesa' },
                { imagen: 'sup12.jpg', descripcion: 'Whey protein bar. Sabor limón' },
                { imagen: 'sup13.jpg', descripcion: 'Whey protein. Con L-glutamina, BCAA y aminoácidos escenciales. Chocolate' },
                { imagen: 'sup14.jpg', descripcion: 'Whey protein. Con L-glutamina, BCAA y aminoácidos escenciales. Frutilla' },
                { imagen: 'sup15.jpg', descripcion: 'Whey protein. Con L-glutamina, BCAA y aminoácidos escenciales. Vainilla' },
                { imagen: 'sup16.jpg', descripcion: 'Whey protein. Isolate + concentrate protein blend' },
                { imagen: 'sup17.jpg', descripcion: 'Creatina micronizada' },
                { imagen: 'sup18.jpg', descripcion: 'Protein bar. Sabor frutillas a la crema' },
                { imagen: 'sup19.jpg', descripcion: 'Whey X-pro. Complex all-in-one protein. Sabor vainilla' },
                { imagen: 'sup20.jpg', descripcion: 'Colageno sport. Con magnesio, cúrcuma y ácido hialurónico. Sabor naranja' },
                { imagen: 'sup21.jpg', descripcion: 'Ena Ultra mass. Weight gainer. Sabor vainilla' },
                { imagen: 'sup22.jpg', descripcion: 'Enargy gel. Repositor energético. Sabor uva' },
                { imagen: 'sup23.jpg', descripcion: 'Enargy gel. Repositor energético. Sabon limón' },
                { imagen: 'sup24.jpg', descripcion: 'Muscle max. Post work' },
                { imagen: 'sup25.jpg', descripcion: 'Creatina monohidrato micronizada. Sin sabor' },
                { imagen: 'sup26.jpg', descripcion: 'Plant protein' }
            ],
            'Todo en Suplementos, Vitaminas y Productos naturales': [
                { imagen: 'vit1.jpg', descripcion: 'Colágeno' },
                { imagen: 'vit2.jpg', descripcion: 'Megacistin max' },
                { imagen: 'vit3.jpg', descripcion: 'Cabello, piel y uñas' },
                { imagen: 'vit4.jpg', descripcion: 'Omegan' },
                { imagen: 'vit5.jpg', descripcion: 'Lecitina 1200' },
                { imagen: 'vit6.jpg', descripcion: 'Isoflavonas de soja' },
                { imagen: 'vit7.jpg', descripcion: 'Ginkgo 80' },
                { imagen: 'vit8.jpg', descripcion: 'Chía. Omega 3' },
                { imagen: 'vit9.jpg', descripcion: 'Guaraná, con polen y vitamina E' },
                { imagen: 'vit10.jpg', descripcion: 'Cúrcuma + jengible. Vitaminas C y E' },
                { imagen: 'vit11.jpg', descripcion: 'Clorofila' },
                { imagen: 'vit12.jpg', descripcion: 'Vitamina B12' },
                { imagen: 'vit13.jpg', descripcion: 'Vitamina C' },
                { imagen: 'vit14.jpg', descripcion: 'Nutri 100. Vitamina E' },
                { imagen: 'vit15.jpg', descripcion: 'Vitamina D' },
                { imagen: 'vit16.jpg', descripcion: 'Vitamina D3' },
                { imagen: 'vit17.jpg', descripcion: 'Curflex plus' },
                { imagen: 'vit18.jpg', descripcion: 'Curflex triple acción' },
                { imagen: 'vit19.jpg', descripcion: 'MSM artro' },
                { imagen: 'vit20.jpg', descripcion: 'Valeriana' },
                { imagen: 'vit21.jpg', descripcion: 'Serenil' },
                { imagen: 'vit22.jpg', descripcion: 'Fosfovita' },
                { imagen: 'vit23.jpg', descripcion: 'Fosfovita silver' },
                { imagen: 'vit24.jpg', descripcion: '102 mujer' },
                { imagen: 'vit25.jpg', descripcion: '102 plus' },
                { imagen: 'vit26.jpg', descripcion: 'Centrum mujer' },
                { imagen: 'vit27.jpg', descripcion: 'Centrum hombre' },
                { imagen: 'vit28.jpg', descripcion: 'Centrum silver' },
                { imagen: 'vit29.jpg', descripcion: 'Centrum base' },
                { imagen: 'vit30.jpg', descripcion: 'Redoxon. Vitamina C' },
                { imagen: 'vit31.jpg', descripcion: 'Redoxon triple acción. Vitamina D y zinc' },
                { imagen: 'vit32.jpg', descripcion: 'Redoxitos Plus. Vitamina D, vitamina C y zinc' },
                { imagen: 'vit33.jpg', descripcion: 'Supradyn forte' },
                { imagen: 'vit34.jpg', descripcion: 'Berocca Plus' },
                { imagen: 'vit35.jpg', descripcion: 'Magnesio sport' },
                { imagen: 'vit36.jpg', descripcion: 'Magnesio. Potasio y vitamina B6' },
                { imagen: 'vit37.jpg', descripcion: 'Citrato de magnesio. Vitamina D' },
                { imagen: 'vit38.jpg', descripcion: 'Quelat. Zinc, magnesio y selenio' },
                { imagen: 'vit39.jpg', descripcion: 'Spirulina siluett. Garcinia y café verde' },
                { imagen: 'sup.jpg', descripcion: 'BCAA. Suplemento dietario a base de aminoacidos ramificados, vitamina C, B2 y B6' },
                { imagen: 'sup2.jpg', descripcion: 'Creatine. Suplemento dietario a base de monohidrato de creatina' },
                { imagen: 'sup3.jpg', descripcion: 'Energy gel. Repositor energético. +3 cafeína, taurina ginseng. Sabor a frutos rojos ' },
                { imagen: 'sup4.jpg', descripcion: 'Energy gel. Repositor energético. +4 L-valina, L-leucina, L-isoleucinal, L-glutamina. Sabor a frutos rojos' },
                { imagen: 'sup5.jpg', descripcion: 'Glutamine. Suplemento dietario a base de L-glutamina' },
                { imagen: 'sup6.jpg', descripcion: 'Multi vitaminico y mineral. Suplemento dietario a base de vitaminas y minerales' },
                { imagen: 'sup7.jpg', descripcion: 'Pre workout energy' },
                { imagen: 'sup8.jpg', descripcion: 'Sport drink' },
                { imagen: 'sup9.jpg', descripcion: 'Whey protein bar. Sabor banana' },
                { imagen: 'sup10.jpg', descripcion: 'Whey protein bar. Sabor chocolate' },
                { imagen: 'sup11.jpg', descripcion: 'Whey protein bar. Sabor frambuesa' },
                { imagen: 'sup12.jpg', descripcion: 'Whey protein bar. Sabor limón' },
                { imagen: 'sup13.jpg', descripcion: 'Whey protein. Con L-glutamina, BCAA y aminoácidos escenciales. Chocolate' },
                { imagen: 'sup14.jpg', descripcion: 'Whey protein. Con L-glutamina, BCAA y aminoácidos escenciales. Frutilla' },
                { imagen: 'sup15.jpg', descripcion: 'Whey protein. Con L-glutamina, BCAA y aminoácidos escenciales. Vainilla' },
                { imagen: 'sup16.jpg', descripcion: 'Whey protein. Isolate + concentrate protein blend' },
                { imagen: 'sup17.jpg', descripcion: 'Creatina micronizada' },
                { imagen: 'sup18.jpg', descripcion: 'Protein bar. Sabor frutillas a la crema' },
                { imagen: 'sup19.jpg', descripcion: 'Whey X-pro. Complex all-in-one protein. Sabor vainilla' },
                { imagen: 'sup20.jpg', descripcion: 'Colageno sport. Con magnesio, cúrcuma y ácido hialurónico. Sabor naranja' },
                { imagen: 'sup21.jpg', descripcion: 'Ena Ultra mass. Weight gainer. Sabor vainilla' },
                { imagen: 'sup22.jpg', descripcion: 'Enargy gel. Repositor energético. Sabor uva' },
                { imagen: 'sup23.jpg', descripcion: 'Enargy gel. Repositor energético. Sabon limón' },
                { imagen: 'sup24.jpg', descripcion: 'Muscle max. Post work' },
                { imagen: 'sup25.jpg', descripcion: 'Creatina monohidrato micronizada. Sin sabor' },
                { imagen: 'sup26.jpg', descripcion: 'Plant protein' }
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

    if (!turnosImage) {
        console.error('El elemento con ID "turnos-image" no existe en el DOM');
        return;
    }

    openTurnos.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Aseguramos que la imagen se establece correctamente y se visualiza en el modal
        const imagePath = 'turnos.jpg'; // Cambia esta ruta si la imagen está en otro directorio
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

    var openArticlesModalBtn = document.getElementById('open-articles-modal');
    var closeArticlesModalBtn = document.getElementById('close-articles-modal');
    var articlesModal = document.getElementById('articles-container');
    var hablemosDeSaludLink = document.querySelector('a[href="#hablemos-salud"]');

    if (openArticlesModalBtn && articlesModal) {
        openArticlesModalBtn.addEventListener('click', function() {
            articlesModal.style.display = 'flex';
            body.classList.add('no-scroll'); // Deshabilitar scroll en el body
        });
    }

    if (hablemosDeSaludLink && articlesModal) {
        hablemosDeSaludLink.addEventListener('click', function(event) {
            event.preventDefault();
            articlesModal.style.display = 'flex';
            body.classList.add('no-scroll'); // Deshabilitar scroll en el body
        });
    }

    if (closeArticlesModalBtn) {
        closeArticlesModalBtn.addEventListener('click', function() {
            articlesModal.style.display = 'none';
            body.classList.remove('no-scroll'); // Habilitar el scroll en el body
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === articlesModal) {
            articlesModal.style.display = 'none';
            body.classList.remove('no-scroll'); // Habilitar el scroll en el body
        }
    });

    var searchInput = document.getElementById("search-input");
    var searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", function() {
        var query = searchInput.value.trim().toLowerCase();
        if (query) {
            var searchResults = { products: [], articles: [] };
            
            for (var category in productsData) {
                productsData[category].forEach(function(product) {
                    if (product.descripcion.toLowerCase().includes(query)) {
                        searchResults.products.push(product);
                    }
                });
            }

            var articleItems = document.querySelectorAll("#articles-list .article-item");
            articleItems.forEach(function(articleItem) {
                var articleTitle = articleItem.dataset.title.toLowerCase();
                if (articleTitle.includes(query)) {
                    searchResults.articles.push({
                        id: articleItem.id,
                        title: articleItem.dataset.title,
                        content: articleItem.querySelector("p").textContent
                    });
                }
            });

            displaySearchResults(searchResults, query);
        }
    });

    function openWarningModal() {
        const warningModal = document.getElementById('warning-modal');
        warningModal.style.display = 'flex';
    }
    
    document.getElementById('close-warning-modal').addEventListener('click', function () {
        const warningModal = document.getElementById('warning-modal');
        warningModal.style.display = 'none'; // Ocultar el modal de advertencia
    });

    
    const description = document.querySelector('.descripcion-container');
    const horariosLink = document.querySelector("#inicio"); // Asegúrate de que el enlace tiene este ID
    
    horariosLink.addEventListener("click", function () {
        description.classList.add("active"); // Agrega la clase
        setTimeout(() => {
        description.classList.remove("active"); // La quita después de 1 segundo
        }, 1000);
    });
});
    
