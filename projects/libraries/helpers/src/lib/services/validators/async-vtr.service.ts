import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {HandlerService} from 'projects/libraries/helpers/src/lib/services/handler.service';
import {map} from 'rxjs/operators';
import {SyncVtrService} from 'projects/libraries/helpers/src/lib/services/validators/sync-vtr.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsyncVtrService implements AsyncValidator {

  baseUrl: string = '';
  elem: string = '';
  updateMsg = {};

  constructor(private hs: HandlerService,
              private vs: SyncVtrService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return this.hs.get(`${this.baseUrl}/match/${this.elem.toString()}/${control.value}`)
      .pipe(map(resp => {
          if (resp['code'] === 200) {
            this.vs.err[`${this.elem}`] = this.updateMsg;
            return {unique: true};
          }

          this.vs.err[`${this.elem}`] = '';

          return null;
        })
      );
  }

  userName(ctl: import('@angular/forms').AbstractControl) {
    this.baseUrl = 'users';
    this.elem = 'name';
    this.updateMsg = 'A user with that name already exists.';
    return this.validate(ctl);
  }

  userPhone(ctl: import('@angular/forms').AbstractControl) {
    this.baseUrl = 'users';
    this.elem = 'phone';
    this.updateMsg = 'The phone already exists.';
    return this.validate(ctl);
  }

  userEmail(ctl: import('@angular/forms').AbstractControl) {
    this.baseUrl = 'users';
    this.elem = 'email';
    this.updateMsg = 'The email already exists.';
    return this.validate(ctl);
  }

  appName(ctl: import('@angular/forms').AbstractControl) {
    this.baseUrl = 'applications';
    this.elem = 'name';
    this.updateMsg = 'An applications with this name already exists.';
    return this.validate(ctl);
  }

}
