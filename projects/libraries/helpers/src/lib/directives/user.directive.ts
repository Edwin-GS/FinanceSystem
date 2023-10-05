import {Directive, Input, HostListener} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SyncVtrService} from 'projects/libraries/helpers/src/lib/services/validators/sync-vtr.service';

@Directive({
  selector: '[ngUser]'
})
export class UserDirective {

  fg: any;

  msg = {
    user: {
      required: 'Required user.',
      unique: 'The email already exists.',
      minLength: 'Min length is 5 digits.',
      maxlength: 'Max length is 25 digits.'
    },
    phone: {
      required: 'Required phone.',
      maxlength: 'Max length is 20 digits.',
      unique: 'The phone already exists.',
    },
    email: {
      required: 'Required email.',
      maxlength: 'Max length is 150 digits.',
      unique: 'The email already exists.',
      pattern: 'Enter a valid email.'
    },
    password: {
      required: 'Required password.',
      pattern: 'The password must contain 8-15 characters, uppercase, lowercase, numbers and special characters.'
    },
    confirmPassword: {
      notEqual: 'Check the passwords, they are not the same.'
    }
  };

  constructor(private vs: SyncVtrService) {
  }

  @Input() set ngUser(fg:FormGroup) {
    this.fg = fg;
  };

  @HostListener('blur') onBlur() {
   this.vs.msgError(this.fg, this.msg);
  }

}
