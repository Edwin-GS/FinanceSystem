import { IPrestamoSolicitudes } from '../interfaces/prestamo-solicitudes.itc';

export class PrestamoSolicitudes implements IPrestamoSolicitudes {
  constructor(
    public _id: '' | undefined,
    public numerosolicitud: '',
    public empresadondetrabaja: '',
    public puestocliente: '',
    public ingresodiario: 0,
    public ingresosemanal: 0,
    public ingresomensual: 0,
    public fechaverificacion: Date,
    public client_id: '',
    public garante_id: '',
    public vehiculo_id: '',
    public propiedad_id: ''
  ) {}
}
