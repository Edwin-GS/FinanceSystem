import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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
    private readonly router: ActivatedRoute){}
  
  contactForm!: FormGroup
  formName: string = 'Profesion'
  name!: string

  user: string = 'pedroacevedo' 
  userID: number = 1
  appID: string = '651d860e8cd11dcf78df2c7e'
  professionID!: string 
  deleteUrl = `entities/delete/${this.user}/profesiones/${this.appID}`
  getUrl = `entities/${this.user}/profesiones/${this.appID}`
  success: boolean = false
  error: boolean = false
  professions: any = []
  showModal: string  = 'none'

  ngOnInit(): void {
    this.getProfessions()
    // this.router.queryParams.subscribe((params: Params) => {
    //   this.name = params['name']
    // })
  }

  getProfessions(): void{
    this.hs.get( this.getUrl )
    .subscribe((res) => {
      if(!res.data) console.log('Hubo un error o no se encontraron datos');
      else{
        this.professions = res.data
        console.log(this.professions);
      }
   })
  }

  deleteProfession(id: string): void{
    this.professionID = id
    console.log(this.professionID);
    this.hs.delete(this.deleteUrl, this.professionID)
      .subscribe((resp) => {
        console.log(resp);
        if(resp["success"] == false ){
          this.showErrorMessage()
        } else{
          this.showSucessMessage()
          this.getProfessions()
        }
      })
  }


  showSucessMessage(): void{
    this.success = true
    setTimeout(() => {
      this.success = false
    }, 4000);
  }

  showErrorMessage(): void{
    this.error = true
    setTimeout(() => {
      this.error = false
    }, 4000);
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    })
  }
}
