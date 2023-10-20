import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Profession } from 'projects/libraries/helpers/src/lib/models/profession.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.css']
})
export class ProfessionComponent {

  constructor(
    private readonly fb: FormBuilder,
    private readonly hs: HandlerService,
  ){}
  
  contactForm!: FormGroup
  formName: string = 'Profesion'
  name!: string
  selection!: Profession
  user: string = 'pedroacevedo' 
  userID: number = 1
  appID: string = '651d860e8cd11dcf78df2c7e'
  professionID!: string 
  deleteUrl = `entities/delete/${this.user}/profesiones/${this.appID}`
  createUrl = `entities/create/${this.user}/profesiones/${this.appID}`
  updateUrl = `entities/update/${this.user}/profesiones/${this.appID}`
  getUrl = `entities/${this.user}/profesiones/${this.appID}`
  success: boolean = false
  error: boolean = false
  professions: Profession[] = []
  showModal: string  = 'none'
  action!: string


  ngOnInit(): void {
    this.getProfessions()
  }

  getProfessions(): void{
    this.hs.get( this.getUrl )
    .subscribe((res) => {
      if(!res.data) console.log('Hubo un error o no se encontraron datos');
      else{
        this.professions = [...res.data]
      }
   })
  }

  deleteProfession(id: string): void{
    this.professionID = id
    console.log(this.professionID);
    this.hs.delete(this.deleteUrl, id)
      .subscribe((resp) => {
        console.log(resp);
        if(resp["success"] == false ){
          this.showErrorMessage()
        } else{
          this.showSucessMessage()
          const currentProf = this.professions.filter( prof => prof._id !== id)
          this.professions = [...currentProf]
          // this.getProfessions()
        }
      })
  }

  createProf ( nombre: '' ): void {
    const data = { nombre: nombre}
    this.hs.post(data, this.createUrl)
      .subscribe((res) => {
        if ( res['success'] == false ) {
          this.showErrorMessage()
        } else {
          this.showSucessMessage()
          const resp: Profession = { _id: res.data._id, nombre: nombre }
          this.professions.push(resp)
        }
      })
  
  }

  updateProf( profesion: Profession ): void{
    this.hs.put(profesion , `${this.updateUrl}/${profesion._id}`)
      .subscribe((resp: any) => {
        if ( resp['success'] == false ) {
          this.showErrorMessage()
        } else {
          const currentProf = this.professions.filter((items) => items._id !== profesion._id)
          this.professions = [...currentProf, profesion]
          this.showSucessMessage()
          
        }
      })
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

  initForm(): FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(7)]]
    })
  }

  clearValues(): void{
    this.selection = {
      _id: '',
      nombre: ''
    }

    this.action = 'Registrar profesion'
  }

  selectProfession(profession: Profession): void{
    this.selection = profession
    this.action = 'Actualizar profesion'
  }
}
