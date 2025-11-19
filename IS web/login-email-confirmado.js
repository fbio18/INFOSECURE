const verifyEmailURL = "http://localhost:4000/confirm-email";

const response = await axios.post(verifyEmailURL, { hasVerifiedEmail: true }, 
    { 
        withCredentials: true,
        headers: {
            'Origin': "http://localhost:5555",
            'Content-Type': "application/json"
        }
    });

if (!response.data.verified) {
    window.location = "http://localhost:5555"
    console.log("Algo falló en la verificación del mail");
}

const formulario = document.getElementById("formInicioSesion");

async function iniciarSesion(datosInicioSesion) {
    const urlInicioSesion = "http://localhost:4000/login";

    const response = await axios.post(urlInicioSesion, datosInicioSesion, 
        { 
            withCredentials: true,
            headers: {
                'Origin': "http://localhost:5555",
                'Content-Type': "application/json"
            }
        });

    window.location = "http://localhost:5555";
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const datosInicioSesion = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    iniciarSesion(datosInicioSesion);
})

