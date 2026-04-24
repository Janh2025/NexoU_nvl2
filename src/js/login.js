const USUARIO_CORRECTO = "Juan";
const PASSWORD_CORRECTA = "juan2026";

const formLogin = document.getElementById("formLogin");
const usuarioInput = document.getElementById("usuario");
const passwordInput = document.getElementById("password");
const areaResultados = document.getElementById("areaResultados");
const btnLogin = document.getElementById("btnLogin");

let intentos = 0;
const MAX_INTENTOS = 3;

function mostrarMensaje(mensaje, color) {
  areaResultados.textContent = mensaje;
  areaResultados.style.color = color;
}

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const usuario = usuarioInput.value.trim();
  const password = passwordInput.value.trim();

  if (usuario === USUARIO_CORRECTO && password === PASSWORD_CORRECTA) {
    mostrarMensaje("¡Bienvenido al sistema! Redirigiendo...", "green");

    setTimeout(function () {
        window.location.href = "src/html/inicio.html";
    }, 1000);

    return;
}

  intentos++;

  if (intentos < MAX_INTENTOS) {
    mostrarMensaje(`Datos incorrectos. Intento ${intentos} de 3.`, "red");
  } else {
    mostrarMensaje("Usuario bloqueado. Ha superado el número de intentos.", "red");
    btnLogin.disabled = true;
    usuarioInput.disabled = true;
    passwordInput.disabled = true;
  }
});