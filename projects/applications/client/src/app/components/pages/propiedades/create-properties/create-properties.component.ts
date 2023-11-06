import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Properties } from 'projects/libraries/helpers/src/lib/models/properties.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-create-properties',
  templateUrl: './create-properties.component.html',
  styleUrls: ['./create-properties.component.css']
})
export class CreatePropertiesComponent {

  
  constructor(
    private readonly hs: HandlerService,
    private readonly router: ActivatedRoute,
    private toast: HotToastService,
    private readonly nv: Router,
    private usr: UserService,
    private fb: FormBuilder
  ){}
  
  title = `Crear propiedad`
  formName: string = 'Profesion'
  registerForm!: FormGroup

  userData = this.usr.getLocalStorage();
  baseUrl: string = `${this.userData?.userdata.name}/propiedades/${this.userData?.app}`
  
  id!: string

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = params['id']
    })
    this.registerForm = this.initForm()
  }

  initForm(): FormGroup{
    return this.fb.group({
      direccion: ['', [Validators.required, Validators.minLength(7)]],
      descripcion: ['', [Validators.required, Validators.minLength(7)]],
      numerotitulo: ['', [Validators.required, Validators.min(1)]],
      clientes_id: [this.id, [Validators.required, Validators.minLength(3)]]
    })
  }

  createProp ( prop: Properties ): void {
    const data = {
      direccion         : prop.direccion,
      descripcion       : prop.descripcion,
      numerotitulo      : prop.numerotitulo,
      clientes_id       : this.id
    }
    
    this.hs.post(data, `entities/create/${this.baseUrl}`)
      .subscribe((res: any) => {
        if ( res['success'] == false ) {
          this.toast.error(
            'Error al intentar registrar, por favor, intente de nuevo'
          );
          console.log('Error', res);
        } else {
          this.toast.success('Propiedad registrada');
          this.goBack()
        }
      })
    }

    onSubmit( changes: Properties ): void{
      this.createProp(changes)
      this.registerForm.reset()
    }

    goBack(){
      this.nv.navigate([
        `/finance-system/users/${this.userData?.userdata.name}/
          ${this.userData?.userdata.id}/properties`, this.id
      ])
    }
}
