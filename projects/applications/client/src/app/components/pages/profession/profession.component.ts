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
  sid: string = '$2a$10$w2pNyaEEV3Dta4w5qyDJ8O6PupPXlbZdxEvsB9WaD4x1EAVB63.Mm'
  user: string = 'pedroacevedo' 
  appID: string = '651d860e8cd11dcf78df2c7e'
  createUrl = `entities/create/${this.user}/profesiones/${this.appID}`
  getUrl = `entities/${this.user}/profesiones/${this.appID}`
  success: boolean = false
  error: boolean = true
  professions: any = []

  ngOnInit(): void {
    this.contactForm = this.initForm()
    localStorage.setItem('LEGOFT_SID_SITE', this.sid);
    this.hs.get( this.getUrl )
      .subscribe((res) => {
        this.professions = res.data
        console.log(this.professions);
    })
    // this.router.queryParams.subscribe((params: Params) => {
    //   this.name = params['name']
    // })
    // this.onSetValue()
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
