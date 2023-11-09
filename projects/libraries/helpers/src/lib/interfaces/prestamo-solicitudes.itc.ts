export interface IPrestamoSolicitudes {
  _id: string | undefined;
  numerosolicitud: string | undefined;
  ingresodiario: number;
  ingresosemanal: number;
  ingresomensual: number;
  fechaverificacion: Date;
  aprobado: boolean,
  client_id: string;
  garante_id: string;
  vehiculo_id: string;
  propiedad_id: string;
}
