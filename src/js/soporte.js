document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================
        1. LÓGICA DE NAVEGACIÓN DE PESTAÑAS (TABS)
    ============================================== */

    const subNavItems = document.querySelectorAll('.sub-nav-item');
    const pestanaContenidos = document.querySelectorAll('.pestana-contenedor .pestana-contenido');

    // Función principal para cambiar de pestaña
    function cambiarPestana(event) {
        // Prevenir la navegación por defecto (si el elemento es un <a>)
        event.preventDefault();

        const target = this.getAttribute('data-target');
        const targetElement = document.getElementById(target);

        if (!targetElement) return; // Salir si no encuentra el elemento

        // 1. Ocultar todos los contenidos de las pestañas
        pestanaContenidos.forEach(content => {
            content.classList.remove('visible');
            content.setAttribute('hidden', true);
            content.style.display = 'none'; // Asegurar ocultamiento
        });

        // 2. Desactivar todos los botones de navegación
        subNavItems.forEach(item => {
            item.classList.remove('activo');
        });

        // 3. Mostrar el contenido de la pestaña seleccionada
        targetElement.classList.add('visible');
        targetElement.removeAttribute('hidden');
        targetElement.style.display = targetElement.classList.contains('grid-contacto') ? 'grid' : 'block';


        // 4. Activar el botón de navegación actual
        this.classList.add('activo');
    }

    // Asignar el listener a cada botón de navegación
    subNavItems.forEach(item => {
        item.addEventListener('click', cambiarPestana);
    });
    
    // Función para manejar el clic inicial en el menú lateral
    // Esto asegura que al cargar la página se muestre la pestaña 'Preguntas Frecuentes'
    function iniciarPestanaActiva() {
        const itemActivo = document.querySelector('.sub-nav-item.activo');
        if (itemActivo) {
            const target = itemActivo.getAttribute('data-target');
            const targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.classList.add('visible');
                targetElement.removeAttribute('hidden');
                // Ajustar display para el layout de contacto si es el inicial
                if (targetElement.classList.contains('grid-contacto')) {
                    targetElement.style.display = 'grid';
                } else {
                    targetElement.style.display = 'block';
                }
            }
        }
    }

    // Inicializar el estado de las pestañas al cargar
    iniciarPestanaActiva();


    /* ==============================================
        2. LÓGICA DEL ACORDEÓN DE FAQs
    ============================================== */

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const answer = this.nextElementSibling; // El elemento .faq-answer es el siguiente hermano

            // Verifica si se está abriendo o cerrando
            const isOpening = !faqItem.classList.contains('open');

            // Cierra todos los acordeones que no sean el actual (opcional, pero buena práctica)
            document.querySelectorAll('.faq-item.open').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('open');
                    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    const otherAnswer = item.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null; // Cierra suavemente
                    otherAnswer.setAttribute('aria-hidden', 'true');
                    // Cambiar icono
                    item.querySelector('.arrow-icon').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });

            // Lógica para abrir/cerrar el acordeón actual
            if (isOpening) {
                // Abrir
                faqItem.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 15 + "px"; // 15px extra por el padding-bottom en CSS
                answer.setAttribute('aria-hidden', 'false');
                // Cambiar icono a flecha hacia arriba
                this.querySelector('.arrow-icon').classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                // Cerrar
                faqItem.classList.remove('open');
                this.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null; // Cierra suavemente
                answer.setAttribute('aria-hidden', 'true');
                // Cambiar icono a flecha hacia abajo
                this.querySelector('.arrow-icon').classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    });

});