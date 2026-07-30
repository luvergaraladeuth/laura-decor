// Funciones para calcular los precios de los paquetes de decoracion

// 1. Calcular precio con descuento
export function calcularPrecioConDescuento(precio, descuento) {
  const valorDescuento = (precio * descuento) / 100;
  const total = precio - valorDescuento;
  return total;
}

// 2. Calcular total del pedido (precio del paquete * cantidad + transporte)
export function calcularTotalPedido(precioUnitario, cantidad, envio = 0) {
  const subtotal = precioUnitario * cantidad;
  const total = subtotal + Number(envio);
  return total;
}

// 3. Calcular precio con IVA (19% por defecto)
export function calcularPrecioConImpuesto(precio, iva = 19) {
  const valorIva = (precio * iva) / 100;
  const total = precio + valorIva;
  return total;
}
