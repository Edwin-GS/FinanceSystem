import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SyncVtrService {

  err: any = {};
  errs = new Subject<object>();

  constructor() {
  }

  reservedAppName(control: FormControl): { [key: string]: boolean } | null {

    if (control.value?.toLowerCase() === 'users' ||
      control.value?.toLowerCase() === 'followed' ||
      control.value?.toLowerCase() === 'followers' ||
      control.value?.toLowerCase() === 'licenses' ||
      control.value?.toLowerCase() === 'screens' ||
      control.value?.toLowerCase() === 'sessions' ||
      control.value?.toLowerCase() === 'applications' ||
      control.value?.toLowerCase() === 'schemas' ||
      control.value?.toLowerCase() === 'entities' ||
      control.value?.toLowerCase() === 'schema-entities' ||
      control.value?.toLowerCase() === 'auth' ||
      control.value?.toLowerCase() === 'notifier' ||
      control.value?.toLowerCase() === 'comments' ||
      control.value?.toLowerCase() === 'likes' ||
      control.value?.toLowerCase() === 'publications' ||
      control.value?.toLowerCase() === 'organizations' ||
      control.value?.toLowerCase() === 'org' ||
      control.value?.toLowerCase() === 'systems' ||
      control.value?.toLowerCase() === 'templates') {
      return {reserved: true};
    }
    return null;
  }

  verifyPasswords(password: string, confirmPassword: string) {

    return (formGroup: FormGroup) => {

      const pass = formGroup.controls[password];
      const confirmPass = formGroup.controls[confirmPassword];

      if (pass.value === confirmPass.value) {

        confirmPass.setErrors(null);

        return null;

      } else {

        confirmPass.setErrors({notEqual: true});

        return {notEqual: true};
      }
    }
  }

  msgError(form: FormGroup, msg: any): Observable<any> {

    this.err = {};

    Object.keys(form.controls).forEach((key: string) => {

      const elem = form.get(key);

      if (elem && !elem.valid && (elem.touched || elem.dirty)) {

        if (elem instanceof FormGroup) {

          Object.keys(elem.controls).forEach((childKey: string) => {

            const childCtl = form.get(`${key}.${childKey}`);

            this.err[`${key}.${childKey}`] = '';

            if (childCtl && !childCtl.valid && (childCtl.touched || childCtl.dirty)) {

              const message = msg[key][childKey];

              for (const err in childCtl.errors) {
                if (err) {this.err[`${key}.${childKey}`] = `${message[err]}  `;}
              }
            }
          });
        } else {

          this.err[key] = '';

          const message = msg[key];

          for (const err in elem.errors) {
            if (err) {this.err[key] += `${message[err]}  `;}
          }
        }
      }
    });

    this.errs.next(this.err);

    return this.errs;
  }

}

