const navbar = document.getElementById("navbarNav");

if (sessionStorage.getItem("userRole") === "admin") {
    console.log("Usuario es admin");

    navbar.innerHTML = `
        <nav class="navbar navbar-expand-sm " id="navbarNav">
            <div class="container-fluid">
                <nav class="navbar">
                    <div class="container-fluid" >
                        <a class="navbar-brand" href="#" id="text">
                            <img src="logo-ISblanco-removebg-preview.png"alt="Logo"  class="img-fluid" id="logonav" >
                            InfoSecure
                        </a>
                    </div>
                </nav>

                <a class="navbar-brand" href="#" ></a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ms-auto" >
                        <li class="nav-item">
                            <a class="nav-link" href="" id="nav">Página de admin</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="registro.html" id="nav">Registrarse</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `
}

else if (sessionStorage.getItem("sesionIniciada")) {
    console.log("Usuario tiene sesión iniciada")

    navbar.innerHTML = `
        <nav class="navbar navbar-expand-sm " id="navbarNav">
            <div class="container-fluid">
                <nav class="navbar">
                    <div class="container-fluid" >
                        <a class="navbar-brand" href="#" id="text">
                            <img src="logo-ISblanco-removebg-preview.png"alt="Logo"  class="img-fluid" id="logonav" >
                            InfoSecure
                        </a>
                    </div>
                </nav>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    `;
}



