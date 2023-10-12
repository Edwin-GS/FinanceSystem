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
  
  registerForm!: FormGroup
  formName: string = 'Profesion'
  sid: string = '$2a$10$w2pNyaEEV3Dta4w5qyDJ8O6PupPXlbZdxEvsB9WaD4x1EAVB63.Mm'
  user: string = 'pedroacevedo' 
  userID: string = '1' 
  appID: string = '651d860e8cd11dcf78df2c7e'
  createUrl = `entities/create/${this.user}/profesiones/${this.appID}`
  backUrl = `/finance-system/users/${this.user}/${this.userID}/profession`
  success: boolean = false
  error: boolean = false
  
  ngOnInit(): void {
    this.registerForm = this.initForm()
  }
  
  initForm(): FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    })
  }
  
  onSubmit(): void{
    this.hs.post(this.registerForm.value, this.createUrl)
      .subscribe((resp) => {
        if ( resp['success'] == false ) {
          this.showErrorMessage()
        } else {
          this.showSucessMessage()
        }
      })
      this.registerForm.reset()
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
