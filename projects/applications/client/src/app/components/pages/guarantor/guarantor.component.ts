import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Client } from 'projects/libraries/helpers/src/lib/models/client.doc';
import { Profession } from 'projects/libraries/helpers/src/lib/models/profession.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-guarantor',
  templateUrl: './guarantor.component.html',
  styleUrls: ['./guarantor.component.css']
})
export class GuarantorComponent {


  constructor(
    private readonly hs: HandlerService,
    private usr: UserService,
    private fb: FormBuilder,
    private readonly router: Router,
    private toast: HotToastService,
  ){}
  
  pageTitle = 'Garante';
  formName: string = 'Profesion'
  userData = this.usr.getLocalStorage();
  baseUrl: string = `${this.userData?.userdata.name}/garantes/${this.userData?.app}`
  
  professions: (Profession | undefined)[] = []
  profUrl: string = `${this.userData?.userdata.name}/profesiones/${this.userData?.app}`
  
  selection!: Client
  guarantors: (Client | undefined)[] = []
  success: boolean = false
  error: boolean = false
  action!: string
  registerForm!: FormGroup

  ngOnInit(): void {
    this.getProfessions()
    this.getGuarantors()
    this.registerForm = this.initForm()
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombre: [this.selection?.nombre, [Validators.required, Validators.minLength(3)]],
      apellidos: [this.selection?.apellidos, [Validators.required, Validators.minLength(4)]],
      tipodocumento:   [this.selection?.tipodocumento, [Validators.required, Validators.minLength(6)]],
      numerodocumento: [this.selection?.numerodocumento, [Validators.required, Validators.minLength(15)]],
      apodo:           [this.selection?.apodo],
      celular:         [this.selection?.celular, [Validators.required, Validators.minLength(13)]],
      telefono:        [this.selection?.telefono, [Validators.required, Validators.minLength(13)]],
      direccionpersonal: [this.selection?.direccionpersonal, [Validators.required, Validators.minLength(7)]],
      direccionfamiliar: [this.selection?.direccionfamiliar, [Validators.required, Validators.minLength(7)]],
      profesiones_id: [this.selection?.profesiones_id, [Validators.required, Validators.minLength(7)]],
    })
  }

  getGuarantors(): void{
    this.hs.get( `entities/${this.baseUrl}` )
    .subscribe((res) => {
      if(!res.data) console.log('Hubo un error o no se encontraron datos');
      else{
        this.guarantors = [...res.data]
      }
   })
  }

  getProfessions(): void{
    this.hs.get( `entities/${this.profUrl}` )
    .subscribe((res) => {
      if(!res.data) console.log('Hubo un error o no se encontraron datos');
      else{
        this.professions = [...res.data]
      }
   })
  }

  createGuarantor ( Guarantor: Client ): void {
    const data = {
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
    
    this.hs.post(data, `entities/create/${this.baseUrl}`)
      .subscribe((res) => {
        if ( res['success'] == false ) {
          this.toast.error(
            'Error al intentar crear por favor intente de nuevo'
          );
          console.log('Error', res);
        } else {
          this.toast.success('Cliente actualizado');
          const resp: Client = { 
            _id: res.data._id, 
            nombre: data.nombre,
            apellidos: data.apellidos,
            tipodocumento: data.tipodocumento,
            numerodocumento: data.numerodocumento,
            apodo: data.apodo,
            celular: data.celular,
            telefono: data.telefono,
            direccionpersonal: data.direccionpersonal,
            direccionfamiliar: data.direccionfamiliar,
            profesiones_id: data.profesiones_id,
          }
          this.guarantors?.push(resp)
        }
      })
  
  }

  deleteGuarantor(id: string): void{
    this.hs.delete(`entities/delete/${this.baseUrl}`, id)
      .subscribe((resp) => {
        if(resp["success"] == false ){
          this.toast.error(
            'Error al intentar eliminar, por favor, intente de nuevo'
          );
          console.log('Error', resp);
        } else{
          this.toast.success('Garante eliminado');
          const currentGuarantor = this.guarantors.filter( props => props?._id !== id)
          this.guarantors = [...currentGuarantor]
        }
      })
  }

  goToCreate(){
    this.router.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
      ${this.userData?.userdata.id}/garantes/create`
    ])
  }

}
