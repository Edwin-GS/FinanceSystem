import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Properties } from 'projects/libraries/helpers/src/lib/models/properties.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-create-update-propiedades',
  templateUrl: './create-update-propiedades.component.html',
  styleUrls: ['./create-update-propiedades.component.css'],
})
export class CreateUpdatePropsComponent {
  @Input() selection!: Properties | undefined
  @Input() action!: string
  @Input() registerForm!: FormGroup
  @Output() updatePropEmitter = new EventEmitter<Properties >()
  @Output() createPropEmitter = new EventEmitter<Properties>()

  userData = this.usr.getLocalStorage();
  schemaName = 'propiedades';

  constructor(
    private usr: UserService,
  ) {}

  onSubmit( changes: Properties ): void{
    if ( this.selection?._id == '' ){
      this.onCreateProp( changes )
    } else {
      this.onUpdateProp(this.selection, changes)
    }
      this.registerForm.reset()
    // console.log('changes', changes);
  }

  onCreateProp( prop: Properties ): void{
    this.createPropEmitter.emit(prop)
    console.log('prop', prop);
  }

  onUpdateProp( item: Properties | undefined , change: Properties ): void{
    const updateData: Properties = { 
      _id: item?._id, 
      direccion: change.direccion,
      descripcion: change.descripcion,
      numerotitulo: change.numerotitulo,
      nombrepropietario: change.nombrepropietario,
    }
    this.updatePropEmitter.emit( updateData )
    console.log('updateData', updateData);
  }

  confirmReset(): void{
    if(confirm("¿Desea cerrar este formulario?")){
      this.registerForm.reset()
    }
  }

  // onSubmit(nombre: string) {
  //   if (this.registerForm.valid) {
  //     const data = { nombre: nombre };
  //     this.hs
  //       .post(
  //         data,
  //         `entities/create/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}`
  //       )
  //       .subscribe(
  //         (resp) => {
  //           if (resp['success'] === true) {
  //             this.registerForm.reset();
  //             console.log(resp);
  //           } else {
  //             console.log('error');
  //           }
  //         },
  //         (err) => {
  //           console.error('Error al iniciar sesión: ' + err);
  //         }
  //       );
  //   }
  // }
}
