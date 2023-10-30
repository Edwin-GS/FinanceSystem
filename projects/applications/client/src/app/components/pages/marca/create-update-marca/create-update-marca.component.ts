import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-create-update-marca',
  templateUrl: './create-update-marca.component.html',
  styleUrls: ['./create-update-marca.component.css'],
})
export class CreateUpdateMarcaComponent {
  brandForm!: FormGroup;
  userData = this.usr.getLocalStorage();
  schemaName = 'marcas';
  //closeModal = false

  constructor(
    private usr: UserService,
    private hs: HandlerService,
    private fb: FormBuilder
  ) {
    this.brandForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(nombre: string) {
    if (this.brandForm.valid) {
      const data = { nombre: nombre };
      this.hs
        .post(
          data,
          `entities/create/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}`
        )
        .subscribe(
          (resp) => {
            if (resp['success'] === true) {
              this.brandForm.reset();
              console.log(resp);
            } else {
              console.log('error');
            }
          },
          (err) => {
            console.error('Error al iniciar sesión: ' + err);
          }
        );
    }
  }
}
