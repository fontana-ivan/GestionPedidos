// persona.js
const personas = JSON.parse(localStorage.getItem('personas')) || [];
const listaPersonas = document.getElementById('lista-personas');

function agregarPersona(nombre, email, telefono) {
    const persona = { nombre, email, telefono };
    personas.push(persona);
    localStorage.setItem('personas', JSON.stringify(personas));

    const li = document.createElement('li');
    li.textContent = `${nombre} - ${email} - ${telefono}`;
    listaPersonas.appendChild(li);
}

function inicializarAltaPersonas() {
    const formPersona = document.getElementById('form-persona');
    
    personas.forEach(persona => {
        const li = document.createElement('li');
        li.textContent = `${persona.nombre} - ${persona.email} - ${persona.telefono}`;
        listaPersonas.appendChild(li);
    });
    
    formPersona.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        
        agregarPersona(nombre, email, telefono);
        formPersona.reset();
    });
}

document.addEventListener('DOMContentLoaded', inicializarAltaPersonas);
