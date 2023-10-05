import {IUser} from "../interfaces/user.itc";


export class User implements IUser {

    constructor(public user = '',
                public email = '',
                public password = '',
                public screen =  {
                    header: 0
                }) {
    }
}

