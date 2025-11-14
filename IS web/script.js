


const tabla = document.getElementById("tabla-ventas");
const btnFiltrar = document.getElementById("btn-filtrar");


function mostrarVentas(lista) {
  tabla.innerHTML = "";
  lista.forEach(v => {
    tabla.innerHTML += `
      <tr>
        <td>${v.producto}</td>
        <td>${v.fecha}</td>
        <td>${v.pais}</td>
        <td>${v.cliente}</td>
        <td>${v.tipo}</td>
        <td>$${v.monto}</td>
      </tr>
    `;
  });
}


async function obtenerVentas(filtros = {}) {
  try {

    const url = "http://localhost:4000/ventas";

    
    const response = await axios.get(url, { params: filtros });

   
    mostrarVentas(response.data);
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    tabla.innerHTML = `<tr><td colspan="6">Error al cargar los datos</td></tr>`;
  }
}


btnFiltrar.addEventListener("click", () => {
  const fecha = document.getElementById("filtro-fecha").value;
  const cliente = document.getElementById("filtro-cliente").value;
  const pais = document.getElementById("filtro-pais").value;
  const tipo = document.getElementById("filtro-tipo").value;

  const filtros = {};
  if (fecha) filtros.fecha = fecha;
  if (cliente) filtros.cliente = cliente;
  if (pais) filtros.pais = pais;
  if (tipo) filtros.tipo = tipo;

  obtenerVentas(filtros);
});


obtenerVentas();
