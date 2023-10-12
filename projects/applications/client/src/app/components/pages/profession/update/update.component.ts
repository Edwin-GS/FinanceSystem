import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  constructor(
    private readonly fb: FormBuilder,
    private readonly hs: HandlerService,
    private readonly router: ActivatedRoute
  ){}
  
  updateForm!: FormGroup
  formName: string = 'Profesion'
  sid: string = '$2a$10$w2pNyaEEV3Dta4w5qyDJ8O6PupPXlbZdxEvsB9WaD4x1EAVB63.Mm'
  user: string = 'pedroacevedo' 
  userID: string = '1' 
  appID: string = '651d860e8cd11dcf78df2c7e'
  professionID!: string;
  nombreValue!: string 
  
  updateUrl = `entities/update/${this.user}/profesiones/${this.appID}`
  findProfession = `entities/${this.user}/profesiones/${this.appID}`
  backUrl = `/finance-system/users/${this.user}/${this.userID}/profession`
  success: boolean = false
  error: boolean = false
  
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.professionID = params['id']
    })
    this.hs.get(`${this.findProfession}/${this.professionID}`)
      .subscribe((resp) => {
        console.log('resp', resp);
        if(!resp.data) console.log('Hubo un error o no se encontraron datos');
        else{
          this.nombreValue = resp.data.nombre
        }
      })
      this.updateForm = this.initForm()
  }
  
  initForm(): FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.minLength(7)]]
    })
  }
  
  onSubmit(): void{
    console.log( this.updateForm.value );
    this.hs.put(this.updateForm.value , `${this.updateUrl}/${this.professionID}`)
      .subscribe((resp: any) => {
        console.log(resp);
        if ( resp['success'] == false ) {
          this.showErrorMessage()
        } else {
          console.log('Ok');
          this.showSucessMessage()
        }
      })
      this.updateForm.reset()
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
}
