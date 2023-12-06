import { IPrestamoSolicitudes } from '../interfaces/prestamo-solicitudes.itc';

export class PrestamoSolicitudes implements IPrestamoSolicitudes {
  constructor(
    public _id: '' | undefined,
    public ingreso: 0,
    public formaDePago: '' ,
    public fechaSolicitud: '' ,
    public fechaInicioPago: '' ,
    public fechaTerminacionPagos: '' ,
    public cantidadPrestamo: 0,
    public cantidadCuotas: 0,
    public porcentajeInteres: 0,

    public aprobado: false,
    public clientes_id: '',
    public garantes_id: '',
    public garantiavehiculos_id: '',
    public propiedades_id: ''
  ) {}
}
