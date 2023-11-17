import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Properties } from 'projects/libraries/helpers/src/lib/models/properties.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-update-propiedades',
  templateUrl: './update-propiedades.component.html',
  styleUrls: ['./update-propiedades.component.css'],
})
export class UpdatePropsComponent {

  id!: ''
  propID!: ''

  formName: string = 'Profesion'
  schemaName = 'propiedades';
  pageTitle = 'Actualizar propiedad'
  registerForm!: FormGroup

  selection!: Properties | undefined
  
  userData = this.usr.getLocalStorage();
  baseUrl: string = `${this.userData?.userdata.name}/propiedades/${this.userData?.app}`

  constructor(
    private readonly router: ActivatedRoute,
    private readonly hs: HandlerService,
    private toast: HotToastService,
    private readonly nv: Router,
    private usr: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = params['id']
      this.propID = params['propID']
    })

    this.getProperty( this.propID )

    this.registerForm = this.initForm()
  }

  onSubmit( changes: Properties ): void{
      this.onUpdateProp( this.selection, changes )
      this.registerForm.reset()
  }


  onUpdateProp( item: Properties | undefined , change: Properties ): void{
    const updateData: Properties = { 
      _id: item?._id, 
      direccion: change.direccion,
      descripcion: change.descripcion,
      numerotitulo: change.numerotitulo,
      clientes_id: this.id,
    }
    this.updateProp( updateData )
  }

  updateProp( properties: Properties | undefined ): void{
    this.hs.put(properties , `entities/update/${this.baseUrl}/${properties?._id}`)
      .subscribe((resp: any) => {
        if ( resp['success'] == false ) {
          console.log('resp', resp);
          this.toast.error(
            'Error al intentar actualizar, por favor, intente de nuevo'
          );
        } else {
          this.toast.success('Propiedad actualizada');
          this.goBack()
        }
      })
  }

  initForm(): FormGroup{
    return this.fb.group({
      direccion: [this.selection?.direccion, [Validators.required, Validators.minLength(7)]],
      descripcion: [this.selection?.descripcion, [Validators.required, Validators.minLength(7)]],
      numerotitulo: [this.selection?.numerotitulo, [Validators.required, Validators.min(1)]],
      clientes_id: [this.id, [Validators.required, Validators.minLength(3)]]
    })
  }

  getProperty( id: string ): void{
    this.hs.get( `entities/${this.baseUrl}/${ id }` )
    .subscribe((res) => {
      if(!res.data){
        console.log('Hubo un error o no se encontraron datos');
      }
      else{
        this.selection = res.data
      }
      console.log('selection', res);
   })
  }

  goBack(){
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/properties`, this.id
    ])
  }

}
