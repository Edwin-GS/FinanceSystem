import { IApplication } from '../interfaces/application.itc';

export class Application implements IApplication {
  constructor(
    public _id: '',
    public name: '',
    public icon: '',
    public description: ''
  ) {}
}
