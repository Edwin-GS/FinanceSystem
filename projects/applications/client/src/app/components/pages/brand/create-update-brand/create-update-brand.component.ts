import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'projects/libraries/helpers/src/lib/models/brand.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-create-update-brand',
  templateUrl: './create-update-brand.component.html',
  styleUrls: ['./create-update-brand.component.css'],
})
export class CreateUpdateBrandComponent implements OnInit {
  brandForm!: FormGroup;
  userData = this.usr.getLocalStorage();
  schemaName = 'marcas';
  loading!: boolean;
  brand!: Brand;

  @Input() id!: string;

  @Output() addNewBrand = new EventEmitter<Brand>();
  @Output() updateBrand = new EventEmitter<Brand>();
  @Output() resetId = new EventEmitter<string>();

  constructor(
    private usr: UserService,
    private hs: HandlerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  ngOnChanges(): void {
    if (this.id) {
      this.getBrand();
    } else {
      this.formInit();
    }
  }

  getBrand() {
    this.loading = true;
    this.hs
      .get(
        `entities/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}/${this.id}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === false) {
            this.loading = false;
            console.log('Error al cargar la marca');
          } else {
            this.brand = resp.data;
            this.loading = false;
            this.setValues();
          }
        },
        (err) => {}
      );
  }

  onCreate(brand: Brand) {
    if (this.brandForm.valid) {
      this.addNewBrand.emit(brand);
      this.brandForm.reset();
    }
  }

  onUpdate(brand: Brand) {
    if (this.brandForm.valid) {
      this.updateBrand.emit(brand);
    }
  }

  formInit() {
    return (this.brandForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
    }));
  }

  setValues() {
    this.brandForm.patchValue({
      nombre: this.brand.nombre,
    });
  }

  onReset(): void {
    this.brandForm.reset();
  }

  onResetId() {
    this.resetId.emit(this.id);
  }
}
