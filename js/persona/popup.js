// popup.js
function inicializarPopup() {
  const popupAltaCliente = document.getElementById('popup-alta-cliente');
  const cerrarPopup = document.getElementById('cerrar-popup');
  const btnAgregarCliente = document.getElementById('agregar-cliente');

  btnAgregarCliente.addEventListener('click', () => {
      popupAltaCliente.style.display = 'block';
  });

  cerrarPopup.addEventListener('click', () => {
      popupAltaCliente.style.display = 'none';
  });
}
