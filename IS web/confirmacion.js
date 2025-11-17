
const closeBtn = document.getElementById("closeBtn");
const overlay = document.querySelector(".overlay");

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}


const resendLink = document.getElementById("resendEmail");

if (resendLink) {
  resendLink.addEventListener("click", (e) => {
    e.preventDefault();

   
    fetch("/api/resend-confirmation", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Correo reenviado correctamente.");
      })
      .catch(() => {
        alert("Hubo un error al reenviar el correo.");
      });
  });
}


function openEmailModal() {
  overlay.style.display = "flex";
}
