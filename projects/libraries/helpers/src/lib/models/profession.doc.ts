import { IProfession } from "../interfaces/profession.itc";

export class Profession implements IProfession {
    constructor(
           public _id: '',
           public nombre: ''
        ){}
}