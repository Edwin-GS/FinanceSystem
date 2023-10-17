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
  appName = 'Legoft';
  logoUrl = 'assets/logo/Legoft-Logo-OK-01-HIGH.png';
  myApps = 'finance-system/users/:user/:user_id/my-apps';

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
            Validators.minLength(5)
            
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
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
            const updatedMyapp = this.myApps
              .replace(':user', user)
              .replace(':user_id', userId);
            // Redirigimos al usuario a su panel de control después de iniciar sesión
            this.router.navigate([updatedMyapp, { user, userId }]);
          }
        },
        (err) => {
          console.error('Error al iniciar sesión: ' + err); // Mensaje de error en la solicitud de inicio de sesión
          //this.showAlert = true;
        }
      );
      } else {
        this.loginForm.markAllAsTouched();
        this.showAlert = true;
      } 

      }
    }
  
