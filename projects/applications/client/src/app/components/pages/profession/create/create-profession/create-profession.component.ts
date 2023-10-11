import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-create-profession',
  templateUrl: './create-profession.component.html',
  styleUrls: ['./create-profession.component.css']
})
export class CreateProfessionComponent {
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly hs: HandlerService,
  ){}
  
  contactForm!: FormGroup
  formName: string = 'Profesion'
  name!: string
  sid: string = '$2a$10$w2pNyaEEV3Dta4w5qyDJ8O6PupPXlbZdxEvsB9WaD4x1EAVB63.Mm'
  user: string = 'pedroacevedo' 
  userID: string = '1' 
  appID: string = '651d860e8cd11dcf78df2c7e'
  createUrl = `entities/create/${this.user}/profesiones/${this.appID}`
  backUrl = `/finance-system/users/${this.user}/${this.userID}/profession`
  success: boolean = true
  error: boolean = true
  
  ngOnInit(): void {
    this.contactForm = this.initForm()
  }
  onSubmit(): void{
    const data = {
      nombre: this.contactForm.value.nombre,
    }
    console.log('here', JSON.stringify(data));
    this.hs.post(this.contactForm.value, this.createUrl)
      .subscribe((resp) => {
        if ( resp['success'] == false ) {
          this.showErrorMessage()
        } else {
          this.showSucessMessage()
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
