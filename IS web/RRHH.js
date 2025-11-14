
const API_URL = "http://localhost:3000/api/empleados"; 


axios.get(API_URL)
  .then(response => {
    const empleados = response.data; 
    mostrarEmpleados(empleados);

    document.getElementById("filtrar").addEventListener("click", () => {
      filtrarEmpleados(empleados);
    });
  })
  .catch(error => {
    console.error("Error al cargar los datos:", error);
    document.getElementById("tablaEmpleados").innerHTML =
      "<tr><td colspan='5'>Error al cargar los datos</td></tr>";
  });




function mostrarEmpleados(lista) {
  const tabla = document.getElementById("tablaEmpleados");
  tabla.innerHTML = "";

  if (!lista || lista.length === 0) {
    tabla.innerHTML = "<tr><td colspan='5'>No se encontraron resultados</td></tr>";
    return;
  }

  lista.forEach(emp => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${emp.nombre}</td>
      <td>${emp.rol}</td>
      <td>$${emp.salario.toLocaleString()}</td>
      <td>${emp.antiguedad} años</td>
      <td class="${emp.estado === "Activo" ? "estado-activo" : "estado-licencia"}">
        ${emp.estado}
      </td>
    `;
    tabla.appendChild(tr);
  });
}



function filtrarEmpleados(data) {
  const rol = document.getElementById("rol").value;
  const salMin = parseInt(document.getElementById("salarioMin").value) || 0;
  const salMax = parseInt(document.getElementById("salarioMax").value) || Infinity;
  const antMin = parseInt(document.getElementById("antiguedadMin").value) || 0;
  const antMax = parseInt(document.getElementById("antiguedadMax").value) || Infinity;
  const activo = document.getElementById("activo").checked;
  const licencia = document.getElementById("licencia").checked;

  
  const filtrado = data.filter(emp => {
    const cumpleRol = !rol || emp.rol === rol;
    const cumpleSalario = emp.salario >= salMin && emp.salario <= salMax;
    const cumpleAnt = emp.antiguedad >= antMin && emp.antiguedad <= antMax;
    const cumpleEstado = 
      (!activo && !licencia) ||
      (activo && emp.estado === "Activo") ||
      (licencia && emp.estado === "Licencia");

    return cumpleRol && cumpleSalario && cumpleAnt && cumpleEstado;
  });

  mostrarEmpleados(filtrado);
}