import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Client } from 'projects/libraries/helpers/src/lib/models/client.doc';
import { Profession } from 'projects/libraries/helpers/src/lib/models/profession.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent {

  userData = this.usr.getLocalStorage();
  professions: (Profession | undefined)[] = []
  registerForm!: FormGroup
  baseUrl: string = `${this.userData?.userdata.name}/clientes/${this.userData?.app}`
  profUrl: string = `${this.userData?.userdata.name}/profesiones/${this.userData?.app}`
  schemaName = 'Clientes';
  isLoading!: boolean

  constructor(
    private readonly hs: HandlerService,
    private usr: UserService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private nv: Router
  ) {}

  ngOnInit(): void {
    this.getProfessions()
    this.registerForm = this.initForm()

  }

  onSubmit( changes: Client ): void{
    this.onCreateClient( changes )
  }

  onCreateClient( Guarantor: Client ): void{
    const data: Client = { 
      _id: Guarantor?._id, 
      nombre: Guarantor.nombre,
      apellidos: Guarantor.apellidos,
      tipodocumento: Guarantor.tipodocumento,
      numerodocumento: Guarantor.numerodocumento,
      apodo: Guarantor.apodo,
      celular: Guarantor.celular,
      telefono: Guarantor.telefono,
      direccionpersonal: Guarantor.direccionpersonal,
      direccionfamiliar: Guarantor.direccionfamiliar,
      profesiones_id: Guarantor.profesiones_id,
    }
    this.createClient( data )
  }

  createClient( Client: Client | undefined ): void{
    this.hs.post(Client , `entities/create/${this.baseUrl}`)
      .subscribe((resp: any) => {
        if ( resp['success'] == false ) {
          console.log('resp', resp);
          this.toast.error(
            'Error al intentar actualizar por favor intente de nuevo'
          );

        } else {
          this.toast.success('Cliente registrado');
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
      direccionfamiliar: ['', [Validators.required, Validators.minLength(7)]],
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
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
      ${this.userData?.userdata.id}/clients`
    ])
  }
}
