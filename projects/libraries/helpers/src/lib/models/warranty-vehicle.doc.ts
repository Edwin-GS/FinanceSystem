import { IWarrantyVehicle } from '../interfaces/warranty-vehicle.itc';

export class WarrantyVehicle implements IWarrantyVehicle {
  constructor(
    public _id: '',
    public color: '',
    public chasis: '',
    public placa: '',
    public descripcion: '',
    public modelos_id: '',
    public tiposvehiculos_id: '',
    public clientes_id: ''
  ) {}
}
