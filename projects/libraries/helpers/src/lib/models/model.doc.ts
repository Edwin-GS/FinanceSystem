import { IModel } from '../interfaces/model.itc';

export class Model implements IModel {
  constructor(public _id: '', public descripcion: '', public marcas_id: '') {}
}
