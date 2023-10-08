import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HandlerService } from '../../../services/handler.service';

@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;
  showAlert: boolean = false;

  initForm():FormGroup {
    return this.fb.group({
       name: ['', [Validators.required, Validators.minLength(5)]],
       email: ['', [Validators.required, Validators.pattern((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) )]],
       password: ['', [Validators.required, Validators.minLength(8), Validators.pattern((/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/))]],
     });
 
   }

  constructor (private readonly fb:FormBuilder) {}
  ngOnInit():void {
    this.signupForm = this.initForm();
  }

  onSubmit(values: any):void{
    if(this.signupForm.valid){      //si el formulario es valido envia los datos
      console.log('form ->', values);
  
      }else {
        this.signupForm.markAllAsTouched();
        this.showAlert = true;     //si no es valido manda este error y activa los campos requeridos
      }
  }

  

}

//ESTE CODGIO ES EL QUE ESTARA EN INTERACCION CON LA BASE DE DATOS, AUN NO TENGO MUCHO CONOCIMIENTO:

//   @Input() isAdmin = false;

//   signupForm!: FormGroup;
//   isLoggedin: boolean = false;
//   showAlert: boolean = false; // Variable para mostrar/ocultar la alerta
  
//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private hs: HandlerService
//   ) {
//     this.signupForm = this.formBuilder.group({
//       user: this.formBuilder.group({
//         name: ['',
//         [Validators.required,
//           Validators.minLength(3) // Validación de correo electrónico)]
//         ]],
//         email: ['',
//       [Validators.required,
//         Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) // Validación de correo electrónico)]
//       ]],
//         password: ['',
//         [Validators.required,
//           Validators.minLength(8)  //validacion contraseña
//         ]],
//       })
//      });

// }
// ngOnInit(): void {

// }

// onSubmit() {
//   if (this.signupForm.valid) {
//     // Limpiamos el token de sesión en el almacenamiento local
//     localStorage.setItem('LEGOFT_SID_SITE', '');
//     const user = this.signupForm.value.user;
//     // const userId = this.signupForm.value.userId;
//     this.showAlert = false;

//     // Realizamos una solicitud POST para iniciar sesión
//     this.hs.post(user, 'users/signUp')
//       .subscribe((resp) => {
//         if (resp['success'] === false) {
//           console.log('Error al crear usuario'); // Mensaje de error al iniciar sesión
//           this.showAlert = true;
//         } else {
//           console.log(resp, 'Esto es la respuesta');
//           this.isLoggedin = true;
//           // Redirigimos al usuario a su panel de control después de iniciar sesión
//           alert('Usuario creado');
//         }
//       }, 
//       (err) => {
//         console.error('Error al crear usuario: ' + err); // Mensaje de error en la solicitud de inicio de sesión
//         //this.showAlert = true;
//       }
//     );
//   }
// }
// }