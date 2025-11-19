const formulario = document.getElementById("formInicioSesion");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const datosInicioSesion = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    iniciarSesion(datosInicioSesion);
})

async function iniciarSesion(datosInicioSesion) {
    const urlInicioSesion = "http://localhost:4000/login";

    const response = await axios.post(urlInicioSesion, datosInicioSesion);

    window.location = "http://localhost:5555";
}
