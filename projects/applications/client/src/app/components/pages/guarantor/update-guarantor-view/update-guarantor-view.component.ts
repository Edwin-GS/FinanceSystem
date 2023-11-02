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
  selector: 'app-update-guarantor-view',
  templateUrl: './update-guarantor-view.component.html',
  styleUrls: ['./update-guarantor-view.component.css'],
})
export class UpdateGuarantorViewComponent {

  selection!: Client | undefined
  professions: (Profession | undefined)[] = []
  registerForm!: FormGroup
  id!: string
  userData = this.usr.getLocalStorage();
  profUrl: string = `${this.userData?.userdata.name}/profesiones/${this.userData?.app}`
  baseUrl: string = `${this.userData?.userdata.name}/clientes/${this.userData?.app}`
  clients: (Client | undefined)[] = []
  isLoading !: boolean
  schemaName = 'Client';

  constructor(
    private readonly hs: HandlerService,
    private usr: UserService,
    private fb: FormBuilder,
    private readonly router: ActivatedRoute,
    private toast: HotToastService,
    private nv: Router
  ) {
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = params['id']
    })
    
    this.getProfessions()
    this.getClient( this.id )
    this.registerForm = this.initForm()

  }

  onSubmit( changes: Client ): void{
    this.onUpdateClient( this.selection, changes )
  }


  onUpdateClient( item: Client | undefined , change: Client ): void{
    const updateData: Guarantor = { 
      _id: item?._id, 
      nombre: change.nombre,
      apellidos: change.apellidos,
      tipodocumento: change.tipodocumento,
      numerodocumento: change.numerodocumento,
      apodo: change.apodo,
      celular: change.celular,
      telefono: change.telefono,
      direccion: change.direccionpersonal,
      profesiones_id: change.profesiones_id,
    }
   
    this.updateClient( updateData )
  }

  updateClient( Client: Guarantor | undefined ): void{
    this.hs.put(Client , `entities/update/${this.baseUrl}/${Client?._id}`)
      .subscribe((resp: any) => {
        if ( resp['success'] == false ) {
          console.log('resp', resp);
          this.toast.error(
            'Error al intentar actualizar por favor intente de nuevo'
          );

        } else {
          this.toast.success('Cliente actualizado');
          console.log('resp', resp);
        }
      })
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombre:            [this.selection?.nombre, [Validators.required, Validators.minLength(3)]],
      apellidos:         [this.selection?.apellidos, [Validators.required, Validators.minLength(4)]],
      tipodocumento:     [this.selection?.tipodocumento, [Validators.required, Validators.minLength(6)]],
      numerodocumento:   [this.selection?.numerodocumento, [Validators.required, Validators.minLength(15)]],
      apodo:             [this.selection?.apodo],
      celular:           [this.selection?.celular, [Validators.required, Validators.minLength(13)]],
      telefono:          [this.selection?.telefono, [Validators.required, Validators.minLength(13)]],
      direccionpersonal: [this.selection?.direccionpersonal, [Validators.required, Validators.minLength(7)]],
      direccionfamiliar: [this.selection?.direccionfamiliar, [Validators.required, Validators.minLength(7)]],
      profesiones_id:    [this.selection?.profesiones_id, [Validators.required, Validators.minLength(7)]],
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

  getClient( id: string ): void{
    this.isLoading = true;
    this.hs.get( `entities/${this.baseUrl}/${ id }` )
    .subscribe((res) => {
      if(!res.data){
        this.isLoading = false;
        console.log('Hubo un error o no se encontraron datos');
      }
      else{
        this.isLoading = false;
        this.selection = res.data
      }
      console.log('selection', this.selection);
   })
  }

  goBack(){
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
      ${this.userData?.userdata.id}/garantes`
    ])
  }
}
