import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Model } from 'projects/libraries/helpers/src/lib/models/model.doc';
import { VehicleType } from 'projects/libraries/helpers/src/lib/models/vehicletype.doc';
import { WarrantyVehicle } from 'projects/libraries/helpers/src/lib/models/warranty-vehicle.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-create-update-warranty-vehicle',
  templateUrl: './create-update-warranty-vehicle.component.html',
  styleUrls: ['./create-update-warranty-vehicle.component.css'],
})
export class CreateUpdateWarrantyVehicleComponent {
  userData = this.usr.getLocalStorage();
  warrantyVehicleForm!: FormGroup;
  models: Model[] = [];
  vehicleTypes: VehicleType[] = [];
  ModelName = 'modelos';
  vehicleTypeName = 'tiposvehiculos';
  schemaName = 'garantiavehiculos';
  loadingWarrantyVehicle!: boolean;
  loadingModels!: boolean;
  loadingVehicleTypes!: boolean;
  warrantyVehicle!: WarrantyVehicle;

  @Input() vehicleId!: string;
  @Input() clientId!: string;

  @Output() addNewVehicle = new EventEmitter<WarrantyVehicle>();
  @Output() updateVehicle = new EventEmitter<WarrantyVehicle>();
  @Output() resetId = new EventEmitter<string>();

  constructor(
    private usr: UserService,
    private hs: HandlerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.vehicleId) {
      this.formInit();
    } else {
      this.formInit();
      this.getWarrantyVehicle();
    }
    this.getModels();
    this.getVehicleTypes();
  }

  getModels() {
    this.loadingModels = true;
    this.hs
      .get(
        `entities/${this.userData?.userdata.name}/${this.ModelName}/${this.userData?.app}`
      )
      .subscribe((resp) => {
        if (resp['success'] === false) {
          this.loadingModels = false;
        } else {
          this.loadingModels = false;
          this.models = [...resp.data];
        }
      });
  }

  getVehicleTypes() {
    this.loadingVehicleTypes = true;
    this.hs
      .get(
        `entities/${this.userData?.userdata.name}/${this.vehicleTypeName}/${this.userData?.app}`
      )
      .subscribe((resp) => {
        if (resp['success'] === false) {
          this.loadingVehicleTypes = false;
        } else {
          this.loadingVehicleTypes = false;
          this.vehicleTypes = [...resp.data];
        }
      });
  }

  getWarrantyVehicle() {
    this.loadingWarrantyVehicle = true;
    this.hs
      .get(
        `entities/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}/${this.vehicleId}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === false) {
            this.loadingWarrantyVehicle = false;
          } else {
            this.warrantyVehicle = resp.data;
            this.loadingWarrantyVehicle = false;
            this.setValues();
          }
        },
        (err) => {}
      );
  }

  onCreate(vehicle: WarrantyVehicle) {
    if (this.warrantyVehicleForm.valid) {
      this.addNewVehicle.emit(vehicle);
      console.log(vehicle);
      this.onReset();
    }
  }

  onUpdate(vehicle: WarrantyVehicle) {
    if (this.warrantyVehicleForm.valid) {
      this.updateVehicle.emit(vehicle);
    }
  }

  formInit() {
    return (this.warrantyVehicleForm = this.fb.group({
      clientes_id: [this.clientId, [Validators.required]],
      color: ['', [Validators.required, Validators.minLength(4)]],
      chasis: [
        '',
        [
          Validators.required,
          Validators.minLength(17),
          Validators.maxLength(17),
        ],
      ],
      placa: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      modelos_id: ['', [Validators.required]],
      tiposvehiculos_id: ['', [Validators.required]],
    }));
  }

  setValues() {
    this.warrantyVehicleForm.patchValue({
      clientes_id: this.clientId,
      color: this.warrantyVehicle.color,
      chasis: this.warrantyVehicle.chasis,
      placa: this.warrantyVehicle.placa,
      descripcion: this.warrantyVehicle.descripcion,
      modelos_id: this.warrantyVehicle.modelos_id,
      tiposvehiculos_id: this.warrantyVehicle.tiposvehiculos_id,
    });
  }

  onReset(): void {
    this.warrantyVehicleForm.reset();
    this.warrantyVehicleForm.patchValue({ clientes_id: this.clientId });
  }

  isValidField(name: string): boolean {
    const fieldName = this.warrantyVehicleForm.get(name) ?? {
      invalid: false,
      touched: false,
    };

    return fieldName.invalid && fieldName.touched;
  }
}
