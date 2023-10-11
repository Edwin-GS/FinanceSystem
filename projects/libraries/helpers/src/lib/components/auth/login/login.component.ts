import { Component, Input, OnInit } from '@angular/core';
import { HandlerService } from '../../../services/handler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // loginForm!: FormGroup;
  // showAlert: boolean = false;

  // initForm():FormGroup {
  //   return this.fb.group({
  //      email: ['', [Validators.required, Validators.pattern((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) )]],
  //      password: ['', [Validators.required, Validators.minLength(8)]],
  //    });

  //  }

  // constructor (private readonly fb:FormBuilder) {}
  // ngOnInit():void {
  //   this.loginForm = this.initForm();
  // }

  // onSubmit(values: any):void{
  //   if(this.loginForm.valid){      //si el formulario es valido envia los datos
  //     console.log('form ->', values);

  //     }else {
  //       this.loginForm.markAllAsTouched();
  //       this.showAlert = true;     //si no es valido manda este error y activa los campos requeridos
  //     }
  // }

  appName = 'Legoft';
  logoUrl = 'assets/logo/Legoft-Logo-OK-01-HIGH.png';
  dashboard = 'finance-system/client/:user/:user_id';

  //@Input() const isAdmin = false;

  loginForm!: FormGroup;
  isLoggedin = false;
  showAlert = false; // Variable para mostrar/ocultar la alerta

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hs: HandlerService
  ) {
    this.loginForm = this.formBuilder.group({
      user: this.formBuilder.group({
        userOrEmail: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), // Validación de correo electrónico)]
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8), //validacion contraseña
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/),
          ],
        ],
      }),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      // Limpiamos el token de sesión en el almacenamiento local
      localStorage.setItem('LEGOFT_SID_SITE', '');
      const user = this.loginForm.value.user;
      const userId = this.loginForm.value.userId;

      // Realizamos una solicitud POST para iniciar sesión
      this.hs.post(user, 'users/login').subscribe(
        (resp) => {
          if (resp['success'] === false) {
            console.log('Error al iniciar sesión'); // Mensaje de error al iniciar sesión
            this.showAlert = true;
          } else {
            console.log(resp, 'Esto es la respuesta');
            localStorage.setItem(
              'USER',
              JSON.stringify({ id: resp.data.id, name: resp.data.user })
            );
            this.isLoggedin = true;
            const updatedDashboard = this.dashboard
              .replace(':user', user)
              .replace(':user_id', userId);
            // Redirigimos al usuario a su panel de control después de iniciar sesión
            this.router.navigate([updatedDashboard, { user, userId }]);
          }
        },
        (err) => {
          console.error('Error al iniciar sesión: ' + err); // Mensaje de error en la solicitud de inicio de sesión
          //this.showAlert = true;
        }
      );
    }
  }
}
