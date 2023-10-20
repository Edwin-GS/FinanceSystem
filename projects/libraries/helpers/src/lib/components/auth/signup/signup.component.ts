import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HandlerService } from '../../../services/handler.service';
import { environment } from 'projects/applications/client/src/environments/environment.development';

@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  appName = 'Legoft';
  logoUrl = 'assets/logo/Legoft-Logo-OK-01-HIGH.png';

  signupForm: FormGroup;
  notifier = false;

  constructor(private formBuilder: FormBuilder, private hs: HandlerService) {
    this.signupForm = this.formBuilder.group({
      user: this.formBuilder.group({
        user: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(25),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(150),
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
      screen: this.formBuilder.group({
        header: [1, [Validators.required]],
      }),
      notifier: [false],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const sendEmail = {
        to: this.signupForm.value.user.email,
        subject: 'Check your Email',
        url: `${environment.LEGOFT_FRONTEND_URL}`,
        msg: {
          title: 'Check your Email',
          text: 'To verify your email click on the link.',
          reply: 'This is an automated email, please do not reply.',
        },
        user: {
          user: this.signupForm.value.user.username,
          email: this.signupForm.value.user.email,
          password: this.signupForm.value.user.password,
          screen: {
            header: 1,
          },
        },
      };
      console.log(sendEmail);

      this.hs.post(sendEmail, `notifier`).subscribe(
        (resp) => {
          if (resp['success'] === false) {
            console.log('Error creating user', resp);
          } else {
            console.log(resp, 'Esto es la respuesta');
            this.signupForm.patchValue({
              notifier: true,
            });
          }
        },
        (err) => {
          console.error('Error creating user: ' + err);
        }
      );
      (err: string) => {
        console.error('Error creating user: ' + err);
      };
    }
  }

  closeDialog() {
    this.signupForm.reset();
    this.notifier = false;
  }
}
