import { IClient } from "../interfaces/client.itc";
import { IGuarantor } from "../interfaces/guarantor.itc";


export class Guarantor implements IGuarantor {
    constructor (
        public _id:  '' | undefined,
        public nombre:  '',
        public apellidos:  '',
        public tipodocumento:  '',
        public numerodocumento:  '',
        public apodo:  '',
        public celular:  '',
        public telefono:  '',
        public direccion: '',
        public profesiones_id: ''
    ) {}
}