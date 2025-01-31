function validarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre");
    const apodo = document.getElementById("apodo");
    const edad = document.getElementById("edad");
    const genero = document.getElementById("genero");
    const tratamiento = document.getElementById("tratamiento");
    const peligrosidad = document.getElementById("peligrosidad");
    const personal_asignado = document.getElementById("personal_asignado");
    const celda = document.getElementById("celda");

    if (!validarTexto(nombre.value)) {
        mostrarError(nombre, "Ingresa un nombre válido (solo letras)");
        return; 
    }

    if (!validarTexto(apodo.value)) {
        mostrarError(apodo, "Ingresa un apodo válido (solo letras)");
        return; 
    }

    if (!validarNumeroPositivo(edad.value)) {
        mostrarError(edad, "Ingresa una edad válida (número positivo)");
        return; 
    }

    if (!validarTexto(genero.value)) {
        mostrarError(genero, "Ingresa un género válido (solo letras)");
        return; 
    }

    if (!validarTexto(tratamiento.value)) {
        mostrarError(tratamiento, "Ingresa un tratamiento válido (solo letras)");
        return;
    }

    if (!validarTexto(peligrosidad.value)) {
        mostrarError(peligrosidad, "Ingresa un nivel de peligrosidad válido (solo letras)");
        return;
    }

    if (!validarNumeroPositivo(personal_asignado.value)) {
        mostrarError(personal_asignado, "Ingresa un DNI del personal asignado válido (solo numeros positivos)");
        return;
    }

    if (!validarNumeroPositivo(celda.value)) {
        mostrarError(celda, "Ingresa un número de celda válido (solo numeros positivo)");
        return;
    }

    event.target.submit();
}

function validarTexto(texto) {
    return /^[a-zA-Z\s]+$/.test(texto);
}

function validarNumeroPositivo(numero) {
    return /^[1-9][0-9]*$/.test(numero); 
}

function mostrarError(campo, mensaje) {
    const error = document.createElement("span");
    error.classList.add("error");
    error.textContent = mensaje;

    if (!campo.nextElementSibling || !campo.nextElementSibling.classList.contains("error")) {
        campo.parentNode.appendChild(error);
    }
}
