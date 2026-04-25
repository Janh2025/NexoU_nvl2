const modal = document.getElementById('modal-nueva-reserva');
const btnCerrar = document.getElementById('btn-cerrar-modal');
const btnConfirmar = document.getElementById('btn-confirmar-reserva');

const btnAbrirLibro = document.getElementById('btn-abrir-libro');
const btnAbrirEquipo = document.getElementById('btn-abrir-equipo');

const inputNombre = document.getElementById('input-nombre');
const inputFecha = document.getElementById('input-fecha');
const inputHoraInicio = document.getElementById('input-hora-inicio');
const inputHoraFin = document.getElementById('input-hora-fin');
const selectRecurso = document.getElementById('select-recurso');
const selectUbicacion = document.getElementById('select-ubicacion');

const areaValidacion = document.getElementById('area-validacion');
const listaReservas = document.getElementById('lista-reservas');
const contadorActivas = document.getElementById('contador-activas');

const tabButtons = document.querySelectorAll('.tab-button');



let intentos = 0;
let totalReservas = 3; // ya hay 3 en el HTML


// verifica que los campos tengan informacion
function validarCampos(nombre, fecha, horaInicio, horaFin, recurso, ubicacion) {
    if (nombre == '') return false;
    if (fecha == '') return false;
    if (horaInicio == '') return false;
    if (horaFin == '') return false;
    if (recurso == '') return false;
    if (ubicacion == '') return false;
    return true;
}

// verifica que la hora fin sea mayor a la inicial
function validarHoras(horaInicio, horaFin) {
    if (horaFin > horaInicio) {
        return true;
    } else {
        return false;
    }
}

// genera un codigo de reserva al azar tipo R2024-456
function generarCodigo() {
    const numero = Math.floor(Math.random() * 900) + 100;
    return 'R2024-' + numero;
}

// devuelve un emoji segun el recurso seleccionado
function obtenerIcono(recurso) {
    if (recurso == 'MacBook Pro 13"') return '💻';
    if (recurso == 'iPad Pro 12.9') return '📱';
    if (recurso == 'Monitor Dell 24"') return '🖥️';
    if (recurso == 'Proyector Epson') return '📽️';
    if (recurso == 'Audífonos Sony') return '🎧';
    if (recurso == 'Cámara Canon EOS') return '📷';
    if (recurso == 'Fundamentos de Programación') return '📚';
    if (recurso == 'Cálculo Diferencial') return '📐';
    if (recurso == 'Historia del Arte') return '🎨';
    if (recurso == 'Inglés Técnico B2') return '📖';
    return '📦';
}

// convierte la fecha de formato
function formatearFecha(fecha) {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const partes = fecha.split('-');
    return partes[2] + ' ' + meses[parseInt(partes[1]) - 1] + ' ' + partes[0];
}

// Se ejecuta al hacer clic
function procesarReserva() {

    // leemos los valores de cada campo
    const nombre = inputNombre.value;
    const fecha = inputFecha.value;
    const horaInicio = inputHoraInicio.value;
    const horaFin = inputHoraFin.value;
    const recurso = selectRecurso.value;
    const ubicacion = selectUbicacion.value;

    // ciclo while para validar los intentos
    while (intentos < 3) {

        // validamos el diligenciamiento de los campos
        const camposOk = validarCampos(nombre, fecha, horaInicio, horaFin, recurso, ubicacion);

        if (camposOk == false) {
            // campos incompletos - sumamos un intento y avisamos
            intentos++;
            mostrarMensaje('error', 'Campos incompletos. Intento ' + intentos + ' de 3.');
            marcarVacios(nombre, fecha, horaInicio, horaFin, recurso, ubicacion);
            break;
        }

        // validamos el rango de horas
        const horasOk = validarHoras(horaInicio, horaFin);

        if (horasOk == false) {
            intentos++;
            mostrarMensaje('error', 'La hora de fin debe ser mayor a la de inicio. Intento ' + intentos + ' de 3.');
            break;
        }

        // Creacion de reserva
        const codigo = generarCodigo();
        agregarTarjeta(nombre, fecha, horaInicio, horaFin, recurso, ubicacion, codigo);
        mostrarMensaje('exito', '¡Reserva creada correctamente! Código: ' + codigo);
        intentos = 0;

        // cerramos el modal despues de un momento
        setTimeout(function() {
            cerrarModal();
        }, 1500);

        break;
    }

    // Bloqueo despues de los intentos
    if (intentos >= 3) {
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Bloqueado';
        mostrarMensaje('bloqueado', 'Usuario bloqueado. Ha superado el número de intentos permitidos.');
    }
}

// Manipulacion del DOM
// muestra un mensaje en el area de validacion
function mostrarMensaje(tipo, texto) {

    // limpiamos el mensaje anterior
    areaValidacion.innerHTML = '';

    // creamos un parrafo nuevo con el mensaje
    const mensaje = document.createElement('p');
    mensaje.textContent = texto;
    mensaje.className = 'mensaje-validacion mensaje-' + tipo;

    // lo agregamos al area de validacion
    areaValidacion.appendChild(mensaje);
}

// creacion de una nueva tarjeta con los datos nuevos
function agregarTarjeta(nombre, fecha, horaInicio, horaFin, recurso, ubicacion, codigo) {

    const icono = obtenerIcono(recurso);

    // creamos el elemento article
    const tarjeta = document.createElement('article');
    tarjeta.className = 'reserva-card reserva-card-nueva';

    // le agregamos el contenido 
    tarjeta.innerHTML = 
        '<div class="reserva-imagen-placeholder">' + icono + '</div>' +
        '<figure class="reserva-contenido">' +
            '<div class="reserva-titulo-row">' +
                '<span class="reserva-icono-tipo">' + icono + '</span>' +
                '<h3 class="reserva-titulo">' + recurso + '</h3>' +
            '</div>' +
            '<p class="reserva-codigo">Código: ' + codigo + '</p>' +
            '<div class="reserva-detalles">' +
                '<p class="reserva-detalle-item">' + formatearFecha(fecha) + '</p>' +
                '<p class="reserva-detalle-item">' + horaInicio + ' - ' + horaFin + '</p>' +
                '<p class="reserva-detalle-item">' + ubicacion + '</p>' +
            '</div>' +
            '<p class="reserva-solicitante">Solicitado por: <strong>' + nombre + '</strong></p>' +
        '</figure>' +
        '<figure class="reserva-acciones">' +
            '<span class="reserva-estado pendiente">Pendiente</span>' +
            '<div class="reserva-botones">' +
                '<button class="btn-reserva btn-cancelar" onclick="cancelarReserva(this)">Cancelar</button>' +
                '<button class="btn-reserva btn-confirmar" onclick="confirmarEstado(this)">Confirmar</button>' +
            '</div>' +
        '</figure>';

    // se coloca arriba 
    listaReservas.insertBefore(tarjeta, listaReservas.firstChild);

    // se actualiza los contadores
    totalReservas++;
    contadorActivas.textContent = totalReservas;

    // animacion de entrada
    setTimeout(function() {
        tarjeta.classList.add('visible');
    }, 10);
}

// pone borde rojo en los campos que esten vacios
function marcarVacios(nombre, fecha, horaInicio, horaFin, recurso, ubicacion) {
    if (nombre == '') inputNombre.style.borderColor = '#EF4444';
    if (fecha == '') inputFecha.style.borderColor = '#EF4444';
    if (horaInicio == '') inputHoraInicio.style.borderColor = '#EF4444';
    if (horaFin == '') inputHoraFin.style.borderColor = '#EF4444';
    if (recurso == '') selectRecurso.style.borderColor = '#EF4444';
    if (ubicacion == '') selectUbicacion.style.borderColor = '#EF4444';
}



// FUNCIONES DEL MODAL

function abrirModal(tipo) {
    // cambiamos el titulo segun si es libro o equipo
    const titulo = document.getElementById('modal-titulo');
    const opciones = selectRecurso.querySelectorAll('option');

    if (tipo == 'libro') {
        titulo.textContent = 'Reservar Libro';
        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].dataset.tipo == 'equipo') {
                opciones[i].hidden = true;
            } else {
                opciones[i].hidden = false;
            }
        }
    } else {
        titulo.textContent = 'Reservar Equipo';
        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].dataset.tipo == 'libro') {
                opciones[i].hidden = true;
            } else {
                opciones[i].hidden = false;
            }
        }
    }

    selectRecurso.value = '';
    modal.classList.add('activo');
}

function cerrarModal() {
    modal.classList.remove('activo');
    limpiarFormulario();
}

function limpiarFormulario() {
    inputNombre.value = '';
    inputFecha.value = '';
    inputHoraInicio.value = '';
    inputHoraFin.value = '';
    selectRecurso.value = '';
    selectUbicacion.value = '';
    areaValidacion.innerHTML = '';

    // quitamos los bordes rojos
    inputNombre.style.borderColor = '';
    inputFecha.style.borderColor = '';
    inputHoraInicio.style.borderColor = '';
    inputHoraFin.style.borderColor = '';
    selectRecurso.style.borderColor = '';
    selectUbicacion.style.borderColor = '';

    // solo se limpia si no esta bloqueado
    if (intentos < 3) {
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = 'Confirmar Reserva';
    }
}



// FUNCIONES DE LAS TARJETAS

// elimina una tarjeta de la lista
function cancelarReserva(boton) {
    const tarjeta = boton.closest('.reserva-card');
    tarjeta.style.opacity = '0';
    tarjeta.style.transition = 'opacity 0.3s ease';

    setTimeout(function() {
        tarjeta.remove();
        if (totalReservas > 0) {
            totalReservas--;
            contadorActivas.textContent = totalReservas;
        }
    }, 300);
}

// cambia el estado de una tarjeta a confirmada
function confirmarEstado(boton) {
    const tarjeta = boton.closest('.reserva-card');
    const estado = tarjeta.querySelector('.reserva-estado');
    estado.className = 'reserva-estado confirmada';
    estado.textContent = 'Confirmada';
    boton.textContent = 'Extender';
    boton.className = 'btn-reserva btn-primario';
    boton.onclick = null;
}

// conectamos los botones con las funciones

btnConfirmar.addEventListener('click', procesarReserva);

btnAbrirLibro.addEventListener('click', function() {
    abrirModal('libro');
});

btnAbrirEquipo.addEventListener('click', function() {
    abrirModal('equipo');
});

btnCerrar.addEventListener('click', function() {
    cerrarModal();
});

// clic en el fondo oscuro cierra el modal
modal.addEventListener('click', function(e) {
    if (e.target == modal) {
        cerrarModal();
    }
});

// tabs de navegacion
for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', function() {
        for (let j = 0; j < tabButtons.length; j++) {
            tabButtons[j].classList.remove('activo');
        }
        this.classList.add('activo');
    });
}