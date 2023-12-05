export interface IPrestamoSolicitudes {
  _id: string | undefined;
  ingreso: number,
  formaDePago: string,
  fechaSolicitud: string,
  fechaInicioPago: string,
  fechaTerminacionPagos: string,
  cantidadPrestamo: number,
  cantidadCuotas: number,
  porcentajeInteres: number, 
  aprobado: boolean,
  clientes_id: string;
  garantes_id: string;
  garantiavehiculos_id: string;
  propiedades_id: string;
}
