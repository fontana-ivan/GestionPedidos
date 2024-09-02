// pedidos.js
const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
let itemsPedido = [];

function agregarItem(producto, cantidad, precio) {
    const total = cantidad * precio;
    const item = { producto, cantidad, precio, total };
    itemsPedido.push(item);
    actualizarTablaItems();
}

function actualizarTablaItems() {
    const tablaItems = document.getElementById('tabla-items').getElementsByTagName('tbody')[0];
    tablaItems.innerHTML = '';
    itemsPedido.forEach((item, index) => {
        const fila = tablaItems.insertRow();
        fila.insertCell(0).textContent = item.producto;
        fila.insertCell(1).textContent = item.cantidad;
        fila.insertCell(2).textContent = item.precio.toFixed(2);
        fila.insertCell(3).textContent = item.total.toFixed(2);

        const acciones = fila.insertCell(4);
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => editarItem(index));
        acciones.appendChild(btnEditar);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => eliminarItem(index));
        acciones.appendChild(btnEliminar);
    });
}

function editarItem(index) {
    const item = itemsPedido[index];
    document.getElementById('producto').value = item.producto;
    document.getElementById('cantidad').value = item.cantidad;
    document.getElementById('precio').value = item.precio;
    
    eliminarItem(index);
}

function eliminarItem(index) {
    itemsPedido.splice(index, 1);
    actualizarTablaItems();
}

function limpiarCamposItem() {
    document.getElementById('producto').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';
}

function inicializarPedidos() {
    const btnAgregarItem = document.getElementById('agregar-item');
    const formPedido = document.getElementById('form-pedido');

    btnAgregarItem.addEventListener('click', () => {
        const producto = document.getElementById('producto').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const precio = parseFloat(document.getElementById('precio').value);

        if (producto && cantidad > 0 && precio > 0) {
            agregarItem(producto, cantidad, precio);
            limpiarCamposItem();
        }
    });

    formPedido.addEventListener('submit', (e) => {
        e.preventDefault();
        const fecha = document.getElementById('fecha').value;
        const descripcion = document.getElementById('descripcion').value;
        const cliente = document.getElementById('cliente').value;

        if (itemsPedido.length > 0) {
            const pedido = { fecha, descripcion, cliente, items: itemsPedido };
            pedidos.push(pedido);
            localStorage.setItem('pedidos', JSON.stringify(pedidos));
            formPedido.reset();
            itemsPedido = [];
            actualizarTablaItems();
        } else {
            alert("Debe agregar al menos un ítem al pedido.");
        }
    });
}
