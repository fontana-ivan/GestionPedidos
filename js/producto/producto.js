// Producto.js
const productos = JSON.parse(localStorage.getItem('productos')) || [];
const listaProductos = document.getElementById('lista-productos');

function agregarProducto(nombre, descripcion) {
    const Producto = {nombre, descripcion};
    productos.push(Producto);
    localStorage.setItem('productos', JSON.stringify(productos));

    const li = document.createElement('li');
    li.textContent = `${nombre} - ${descripcion}`;
    listaProductos.appendChild(li);
}

function inicializarAltaProductos() {
    const formProducto = document.getElementById('form-producto');
    
    productos.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${producto.descripcion}`;
        listaProductos.appendChild(li);
    });

    formProducto.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        
        agregarProducto(nombre, descripcion);
        formProducto.reset();
    });
}

document.addEventListener('DOMContentLoaded', inicializarAltaProductos);
