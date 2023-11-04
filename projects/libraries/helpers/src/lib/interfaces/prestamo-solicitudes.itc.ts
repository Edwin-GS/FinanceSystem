export interface IPrestamoSolicitudes {
  _id: string | undefined;
  numerosolicitud: string | undefined;
  empresadondetrabaja: string;
  puestocliente: string;
  ingresodiario: number;
  ingresosemanal: number;
  ingresomensual: number;
  fechaverificacion: Date;
  client_id: string;
  garante_id: string;
  vehiculo_id: string;
  propiedad_id: string;
}
