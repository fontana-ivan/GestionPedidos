document.addEventListener('DOMContentLoaded', () => {
    const formPersona = document.getElementById('form-persona');
    const formProducto = document.getElementById('form-producto');
    const formPedido = document.getElementById('form-pedido');

    const formPersonaPopup = document.getElementById('form-persona-popup');


    const selectCliente = document.getElementById('cliente');
    
    const btnAgregarItem = document.getElementById('agregar-item');
    const popupAltaCliente = document.getElementById('popup-alta-cliente');
    const cerrarPopup = document.getElementById('cerrar-popup');
    const btnAgregarCliente = document.getElementById('agregar-cliente');

    const personas = JSON.parse(localStorage.getItem('personas')) || [];
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    let itemsPedido = [];

    const tablaItems = null;

    if (formPedido) {
        tablaItems = document.getElementById('tabla-items').getElementsByTagName('tbody')[0];
    }


    // Manejo de alta de personas
    if (formPersona) {
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
            
            const persona = {nombre, email, telefono};
            personas.push(persona);
            localStorage.setItem('personas', JSON.stringify(personas));

            const li = document.createElement('li');
            li.textContent = `${nombre} - ${email} - ${telefono}`;
            listaPersonas.appendChild(li);

            formPersona.reset();
        });
    }

    // Manejo de alta de productos
    if (formProducto) {
        productos.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - ${producto.descripcion}`;
            listaProductos.appendChild(li);
        });

        formProducto.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            
            const producto = { nombre, descripcion};
            productos.push(producto);
            localStorage.setItem('productos', JSON.stringify(productos));

            const li = document.createElement('li');
            li.textContent = `${nombre} - ${descripcion}`;
            listaProductos.appendChild(li);

            formProducto.reset();
        });
    }

    // Función para llenar el select de clientes
    function llenarSelectClientes() {
        selectCliente.innerHTML = ''; // Limpiar el select antes de llenarlo

        if (selectCliente) {
            if (personas.length === 0) {
                abrirPopup();
            }
            personas.forEach(persona => {
                const option = document.createElement('option');
                option.value = persona.nombre;
                option.textContent = persona.nombre;
                selectCliente.appendChild(option);
            });
        } 
    }

    // Llenar el select de clientes al cargar la página
    llenarSelectClientes();

    // Abrir el popup de alta de clientes
    btnAgregarCliente.addEventListener('click', () => {
        popupAltaCliente.style.display = 'block';
    });

    // Cerrar el popup
    cerrarPopup.addEventListener('click', () => {
        popupAltaCliente.style.display = 'none';
    });

    // Manejar la creación de clientes desde el popup
    formPersonaPopup.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre-popup').value;
        const email = document.getElementById('email-popup').value;
        const telefono = document.getElementById('telefono-popup').value;
        
        const persona = { nombre, email, telefono };
        personas.push(persona);
        localStorage.setItem('personas', JSON.stringify(personas));

        // Actualizar el select de clientes y cerrar el popup
        llenarSelectClientes();
        popupAltaCliente.style.display = 'none';
        formPersonaPopup.reset();
    });

    // Función para agregar ítem al pedido
    btnAgregarItem.addEventListener('click', () => {
        const producto = document.getElementById('producto').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const precio = parseFloat(document.getElementById('precio').value);
        
        if (producto && cantidad > 0 && precio > 0) {
            const total = cantidad * precio;
            const item = { producto, cantidad, precio, total };
            itemsPedido.push(item);
            actualizarTablaItems();
            limpiarCamposItem();
        }
    });

    // Función para actualizar la tabla de ítems
    function actualizarTablaItems() {
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

    // Función para limpiar los campos de ítem
    function limpiarCamposItem() {
        document.getElementById('producto').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('precio').value = '';
    }

    // Función para editar un ítem
    function editarItem(index) {
        const item = itemsPedido[index];
        document.getElementById('producto').value = item.producto;
        document.getElementById('cantidad').value = item.cantidad;
        document.getElementById('precio').value = item.precio;
        
        eliminarItem(index); // Elimina el ítem para permitir la edición
    }

    // Función para eliminar un ítem
    function eliminarItem(index) {
        itemsPedido.splice(index, 1);
        actualizarTablaItems();
    }

    // Manejar la creación del pedido
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
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
          console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
          console.log('Service Worker no se pudo registrar:', error);
      });
}

