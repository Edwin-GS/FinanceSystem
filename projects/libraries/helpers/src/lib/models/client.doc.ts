import { IClient } from "../interfaces/client.itc";


export class Client implements IClient {
    constructor (
        public _id:  '' | undefined,
        public nombre:  '',
        public apellidos:  '',
        public tipodocumento:  '',
        public numerodocumento:  '',
        public apodo:  '',
        public celular:  '',
        public telefono:  '',
        public direccionpersonal: '',
        public direccionfamiliar: '',
        public profesiones_id: ''
    ) {}
}