import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profession } from 'projects/libraries/helpers/src/lib/models/profession.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.css']
})
export class ProfessionComponent {

  constructor(
    private readonly hs: HandlerService,
    private readonly fb: FormBuilder,
  ){}
  
  formName: string = 'Profesion'
  selection!: Profession | undefined
  user: string = 'pedroacevedo' 
  appID: string = '651d860e8cd11dcf78df2c7e'
  professionID!: string 
  baseUrl: string = `${this.user}/profesiones/${this.appID}`
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
          this.showErrorMessage()
        } else {
          this.showSucessMessage()
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
          this.showErrorMessage()
        } else{
          this.showSucessMessage()

          const currentProf = this.professions?.filter((prof) => prof?._id !== id )
          this.professions = [ ...currentProf ]
        }
      })
  }

  updateProf( profesion: Profession | undefined ): void{
    this.hs.put(profesion , `entities/update/${this.baseUrl}/${profesion?._id}`)
      .subscribe((resp: any) => {
        if ( resp['success'] == false ) {
          this.showErrorMessage()
        } else {
          const currentProf = this.professions?.filter((items) => items?._id !== profesion?._id)
          this.professions = [ ...currentProf ]
          this.professions.unshift( profesion )
          this.showSucessMessage()
        }
      })
  }

  selectProfession(profession: Profession | undefined ): void{
    this.registerForm = this.initForm()
    this.selection = profession
    this.action = 'Actualizar profesion'
  }

  showSucessMessage(): void{
    this.success = true
    setTimeout(() => {
      this.success = false
    }, 5000);
  }

  showErrorMessage(): void{
    this.error = true
    setTimeout(() => {
      this.error = false
    }, 5000);
  }

  clearValues(): void{
    this.selection = {
      _id: '',
      nombre: ''
    }
    this.action = 'Registrar profesion'
  }
}
