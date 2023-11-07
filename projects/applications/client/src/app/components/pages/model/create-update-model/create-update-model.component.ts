import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'projects/libraries/helpers/src/lib/models/brand.doc';
import { Model } from 'projects/libraries/helpers/src/lib/models/model.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-create-update-model',
  templateUrl: './create-update-model.component.html',
  styleUrls: ['./create-update-model.component.css'],
})
export class CreateUpdateModelComponent implements OnInit, OnChanges {
  userData = this.usr.getLocalStorage();
  modelForm!: FormGroup;
  brands: Brand[] = [];
  brandName = 'marcas';
  schemaName = 'modelos';
  loadingModel!: boolean;
  loadingBrand!: boolean;
  model!: Model;

  @Input() id!: string;

  @Output() addNewModel = new EventEmitter<Model>();
  @Output() updateModel = new EventEmitter<Model>();
  @Output() resetId = new EventEmitter<string>();

  constructor(
    private usr: UserService,
    private hs: HandlerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.getBrands();
  }

  ngOnChanges(): void {
    if (this.id) {
      this.getModel();
    } else {
      this.formInit();
    }
  }

  getBrands() {
    this.loadingBrand = true;
    this.hs
      .get(
        `entities/${this.userData?.userdata.name}/${this.brandName}/${this.userData?.app}`
      )
      .subscribe((resp) => {
        if (resp['success'] === false) {
          this.loadingBrand = false;
          console.log('Error al cargar las marcas');
        } else {
          this.loadingBrand = false;
          this.brands = [...resp.data];
        }
      });
  }

  getModel() {
    this.loadingModel = true;
    this.hs
      .get(
        `entities/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}/${this.id}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === false) {
            this.loadingModel = false;
            console.log('Error al cargar el modelo');
          } else {
            this.model = resp.data;
            this.loadingModel = false;
            this.setValues();
          }
        },
        (err) => {}
      );
  }

  onCreate(model: Model) {
    if (this.modelForm.valid) {
      this.addNewModel.emit(model);
      this.onReset();
    }
  }

  onUpdate(model: Model) {
    if (this.modelForm.valid) {
      this.updateModel.emit(model);
    }
  }

  formInit() {
    return (this.modelForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(2)]],
      marcas_id: ['', [Validators.required]],
    }));
  }

  setValues() {
    this.modelForm.patchValue({
      descripcion: this.model.descripcion,
      marcas_id: this.model.marcas_id,
    });
  }

  onReset(): void {
    this.modelForm.reset();
  }

  onResetId() {
    this.resetId.emit(this.id);
  }
}
