import {Component, Input, OnInit} from '@angular/core';
import {HandlerService} from "../../../services/handler.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 appName="Legoft";
 logoUrl='assets/logo/Legoft-Logo-OK-01-HIGH.png';
 dashboard='legoft-lab/client/:user/:user_id';

  @Input() isAdmin = false;

  loginForm!: FormGroup;
  isLoggedin: boolean = false;
  showAlert: boolean = false; // Variable para mostrar/ocultar la alerta

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hs: HandlerService
  ) {
   this.loginForm = this.formBuilder.group({
    user: this.formBuilder.group({
      email: ['',
      [Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) // Validación de correo electrónico)]
      ]],
      password: ['',
      [Validators.required,
        Validators.minLength(8)  //validacion contraseña
      ]],
    })
   });

  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Limpiamos el token de sesión en el almacenamiento local
      localStorage.setItem('LEGOFT_SID_SITE', '');
      const user = this.loginForm.value.user;
      const userId = this.loginForm.value.userId;
      this.showAlert = false;
  
      // Realizamos una solicitud POST para iniciar sesión
      this.hs.post(user, 'users/login')
        .subscribe((resp) => {
          if (resp['success'] === false) {
            console.log('Error al iniciar sesión'); // Mensaje de error al iniciar sesión
            this.showAlert = true;
          } else {
            console.log(resp, 'Esto es la respuesta');
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

//let user = {userOrEmail: "andres25", password: "Andres25."}
