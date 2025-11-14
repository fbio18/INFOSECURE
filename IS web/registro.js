
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formRegistro");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const pass1 = document.getElementById("password").value;
        const pass2 = document.getElementById("confirmar").value;

        if (pass1 !== pass2) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const datosUsuario = {
            username: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            password: pass1,
            role: "admin"
        }

        registrarUsuario(datosUsuario);
    });
});

async function registrarUsuario(datosRegistro) {
    
    const userCreationUrl = "http://localhost:4000/user";

    const response = await axios.post(userCreationUrl, datosRegistro, { withCredentials: true });

    window.location = "http://localhost:5555/inicio-sesion.html";
}
