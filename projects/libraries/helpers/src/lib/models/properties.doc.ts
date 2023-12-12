import { IProperties } from "../interfaces/properties.itc";

export class Properties implements IProperties {
    constructor(
        public _id: '' | undefined,
        public direccion: '', 
        public descripcion: '', 
        public numerotitulo: 0, 
        public clientes_id: ''
    ){}
}