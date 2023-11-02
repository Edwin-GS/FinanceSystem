import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Profession } from 'projects/libraries/helpers/src/lib/models/profession.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.css']
})
export class ProfessionComponent {

  constructor(
    private readonly hs: HandlerService,
    private readonly fb: FormBuilder,
    private usr: UserService,
    private toast: HotToastService,
  ){}
  
  userData = this.usr.getLocalStorage();
  baseUrl: string = `${this.userData?.userdata.name}/profesiones/${this.userData?.app}`
  formName: string = 'Profesion'
  selection!: Profession | undefined
  user: string = 'pedroacevedo' 
  appID: string = '651d860e8cd11dcf78df2c7e'
  professionID!: string 
  success: boolean = false
  error: boolean = false
  professions: (Profession | undefined)[] = []
  action!: string
  registerForm!: FormGroup

  ngOnInit(): void {
    this.getProfessions()
    this.registerForm = this.initForm()
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombre: [this.selection?.nombre, [Validators.required, Validators.minLength(7)]]
    })
  }

  getProfessions(): void{
    this.hs.get( `entities/${this.baseUrl}` )
    .subscribe((res) => {
      if(!res.data) console.log('Hubo un error o no se encontraron datos');
      else{
        this.professions = [...res.data]
      }
   })
  }

  createProf ( nombre: '' ): void {
    const data = { nombre: nombre}
    this.hs.post(data, `entities/create/${this.baseUrl}`)
      .subscribe((res) => {
        if ( res['success'] == false ) {
          this.toast.error(
            'Error al intentar registrar, por favor, intente de nuevo'
          );
        } else {
          this.toast.success('Profesion eliminada');
          const resp: Profession = { _id: res.data._id, nombre: nombre }
          this.professions?.push(resp)
        }
      })
  
  }

  deleteProfession(id: string | undefined): void{
    this.hs.delete(`entities/delete/${this.baseUrl}`, id)
      .subscribe((resp) => {
        console.log(resp);
        if(resp["success"] == false ){
          this.toast.error(
            'Error al intentar eliminar, por favor, intente de nuevo'
          );
        } else{
          this.toast.success('Profesion eliminada');
          const currentProf = this.professions?.filter((prof) => prof?._id !== id )
          this.professions = [ ...currentProf ]
        }
      })
  }

  updateProf( profesion: Profession | undefined ): void{
    this.hs.put(profesion , `entities/update/${this.baseUrl}/${profesion?._id}`)
      .subscribe((resp: any) => {
        if ( resp['success'] == false ) {
          this.toast.error(
            'Error al intentar actualizar, por favor, intente de nuevo'
          );
        } else {
          this.toast.success('Profesion eliminada');
          const currentProf = this.professions?.filter((items) => items?._id !== profesion?._id)
          this.professions = [ ...currentProf ]
          this.professions.unshift( profesion )
        }
      })
  }

  selectProfession(profession: Profession | undefined ): void{
    this.registerForm = this.initForm()
    this.selection = profession
    this.action = 'Actualizar profesion'
  }

  clearValues(): void{
    this.selection = {
      _id: '',
      nombre: ''
    }
    this.action = 'Registrar profesion'
  }
}
