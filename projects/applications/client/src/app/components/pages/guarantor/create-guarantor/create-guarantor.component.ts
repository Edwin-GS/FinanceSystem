import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Client } from 'projects/libraries/helpers/src/lib/models/client.doc';
import { Guarantor } from 'projects/libraries/helpers/src/lib/models/guarantor.doc';
import { Profession } from 'projects/libraries/helpers/src/lib/models/profession.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-create-guarantor',
  templateUrl: './create-guarantor.component.html',
  styleUrls: ['./create-guarantor.component.css'],
})
export class CreateGuarantorComponent {

  professions: (Profession | undefined)[] = []
  registerForm!: FormGroup
  userData = this.usr.getLocalStorage();
  baseUrl: string = `${this.userData?.userdata.name}/garantes/${this.userData?.app}`
  profUrl: string = `${this.userData?.userdata.name}/profesiones/${this.userData?.app}`
  schemaName = 'Garantes';
  isLoading!: boolean

  constructor(
    private readonly hs: HandlerService,
    private usr: UserService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfessions()
    this.registerForm = this.initForm()

  }

  onSubmit( changes: Client ): void{
    this.onCreateGuarantor( changes )
  }

  onCreateGuarantor( Guarantor: Client ): void{
    const data: Guarantor = { 
      _id: Guarantor?._id, 
      nombre: Guarantor.nombre,
      apellidos: Guarantor.apellidos,
      tipodocumento: Guarantor.tipodocumento,
      numerodocumento: Guarantor.numerodocumento,
      apodo: Guarantor.apodo,
      celular: Guarantor.celular,
      telefono: Guarantor.telefono,
      direccion: Guarantor.direccionpersonal,
      profesiones_id: Guarantor.profesiones_id,
    }
    this.createGuarantor( data )
  }

  createGuarantor( Guarantor: Guarantor | undefined ): void{
    this.hs.post(Guarantor , `entities/create/${this.baseUrl}`)
      .subscribe((resp: any) => {
        if ( resp['success'] == false ) {
          console.log('resp', resp);
          this.toast.error(
            'Error al intentar crear por favor intente de nuevo'
          );
        } else {
          this.toast.success('Garante registrado');
          this.goBack()
        }
      })
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombre:            ['', [Validators.required, Validators.minLength(3)]],
      apellidos:         ['', [Validators.required, Validators.minLength(4)]],
      tipodocumento:     ['', [Validators.required, Validators.minLength(6)]],
      numerodocumento:   ['', [Validators.required, Validators.minLength(15)]],
      apodo:             [''],
      celular:           ['', [Validators.required, Validators.minLength(13)]],
      telefono:          ['', [Validators.required, Validators.minLength(13)]],
      direccionpersonal: ['', [Validators.required, Validators.minLength(7)]],
      profesiones_id:    ['', [Validators.required, Validators.minLength(7)]],
    })
  }

  getProfessions(): void{
    this.isLoading = true;
    this.hs.get( `entities/${this.profUrl}` )
    .subscribe((res) => {
      if(!res.data) {
        this.isLoading = false;
        console.log('Hubo un error o no se encontraron datos');
      }
      else{
        this.isLoading = false;
        this.professions = [...res.data]
      }
   })
  }

  goBack(){
    this.router.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
      ${this.userData?.userdata.id}/garantes`
    ])
  }
}
