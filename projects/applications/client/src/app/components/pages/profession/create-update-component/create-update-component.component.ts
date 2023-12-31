import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profession } from 'projects/libraries/helpers/src/lib/models/profession.doc';

@Component({
  selector: 'app-create-update-component',
  templateUrl: './create-update-component.component.html',
  styleUrls: ['./create-update-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUpdateComponentComponent {

  constructor(){}
  @Input() selection!: Profession | undefined
  @Input() action!: string
  @Input() registerForm!: FormGroup
  @Output() createProfEmitter = new EventEmitter<''>()
  @Output() updateProfEmitter = new EventEmitter<Profession | undefined >()
  
  formName: string = 'Profesion'
  sid: string = '$2a$10$w2pNyaEEV3Dta4w5qyDJ8O6PupPXlbZdxEvsB9WaD4x1EAVB63.Mm'
  user: string = 'pedroacevedo' 
  userID: string = '1' 
  appID: string = '651d860e8cd11dcf78df2c7e'
  createUrl = `entities/create/${this.user}/profesiones/${this.appID}`
  backUrl = `/finance-system/users/${this.user}/${this.userID}/profession`
  updateUrl = `entities/update/${this.user}/profesiones/${this.appID}`
  success: boolean = false
  error: boolean = false
  
  onSubmit( nombre: '' ): void{
    if ( this.selection?._id == '' ){
      this.onCreateProf( nombre )
    } else {
      this.onUpdateProf(this.selection, nombre)
    }
      this.registerForm.reset()
  }

  onCreateProf ( nombre: '' ): void{
    this.createProfEmitter.emit(nombre)
  }

  onUpdateProf( item: Profession | undefined , change: '' ): void{
    const updateData: Profession = { _id: item?._id, nombre: change}
    this.updateProfEmitter.emit( updateData )
  }

  confirmReset(): void{
    if(confirm("¿Desea cerrar este formulario?")){
      this.registerForm.reset()
    }
  }
}
