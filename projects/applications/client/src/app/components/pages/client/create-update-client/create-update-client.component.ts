import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'projects/libraries/helpers/src/lib/models/client.doc';
import { Profession } from 'projects/libraries/helpers/src/lib/models/profession.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-create-update-client',
  templateUrl: './create-update-client.component.html',
  styleUrls: ['./create-update-client.component.css'],
})
export class CreateUpdateClientComponent {
  @Input() selection!: Client | undefined
  @Input() professions: (Profession | undefined)[] = []
  @Input() action!: string
  @Input() registerForm!: FormGroup
  @Output() createClientEmitter = new EventEmitter<Client>()
  @Output() updateClientEmitter = new EventEmitter<Client >()

  userData = this.usr.getLocalStorage();
  schemaName = 'propiedades';

  constructor(
    private usr: UserService,
  ) {}

  onSubmit( changes: Client ): void{
    if ( this.selection?._id == '' ){
      this.onCreateProp( changes )
    } else {
      this.onUpdateProp(this.selection, changes)
    }
      this.registerForm.reset()
  }

  onCreateProp( Client: Client ): void{
    this.createClientEmitter.emit(Client)
  }

  onUpdateProp( item: Client | undefined , change: Client ): void{
    const updateData: Client = { 
      _id: item?._id, 
      nombre: change.nombre,
      apellidos: change.apellidos,
      tipodocumento: change.tipodocumento,
      numerodocumento: change.numerodocumento,
      apodo: change.apodo,
      celular: change.celular,
      telefono: change.telefono,
      direccionpersonal: change.direccionpersonal,
      direccionfamiliar: change.direccionfamiliar,
      profesiones_id: change.profesiones_id,
    }
    console.log('updateData', updateData);
    this.updateClientEmitter.emit( updateData )
  }

  confirmReset(): void{
    if(confirm("¿Desea cerrar este formulario?")){
      this.registerForm.reset()
    }
  }
}
