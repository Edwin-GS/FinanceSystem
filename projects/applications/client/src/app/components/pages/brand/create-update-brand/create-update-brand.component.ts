import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'projects/libraries/helpers/src/lib/models/brand.doc';

@Component({
  selector: 'app-create-update-brand',
  templateUrl: './create-update-brand.component.html',
  styleUrls: ['./create-update-brand.component.css'],
})
export class CreateUpdateBrandComponent {
  brandForm!: FormGroup;
  @Input() selectedBrand!: Brand;
  @Input() _id!: string;
  @Input() isCreating!: boolean;

  @Output() addNewBrand = new EventEmitter<string>();
  @Output() updateBrand = new EventEmitter<Brand>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.brandForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [
        this.selectedBrand,
        [Validators.required, Validators.minLength(3)],
      ],
    });
  }

  onAddNewBrand(nombre: string) {
    if (this.brandForm.valid) {
      this.addNewBrand.emit(nombre);
      this.brandForm.reset();
    }
  }

  onUpdateBrand(nombre: string) {
    if (this.brandForm.valid) {
      const updatedBrand = { _id: this.selectedBrand._id, nombre: nombre };
      this.updateBrand.emit(updatedBrand);
      this.brandForm.reset();
    }
  }
}
