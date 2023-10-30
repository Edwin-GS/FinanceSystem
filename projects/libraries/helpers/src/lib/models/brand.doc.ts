import { IBrand } from '../interfaces/brand.itc';

export class Brand implements IBrand {
  constructor(public _id: string, public nombre: string) {}
}
