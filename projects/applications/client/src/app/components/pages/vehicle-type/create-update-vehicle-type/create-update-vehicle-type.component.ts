import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleType } from 'projects/libraries/helpers/src/lib/models/vehicletype.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-create-update-vehicle-type',
  templateUrl: './create-update-vehicle-type.component.html',
  styleUrls: ['./create-update-vehicle-type.component.css'],
})
export class CreateUpdateVehicleTypeComponent implements OnInit {
  userData = this.usr.getLocalStorage();
  vehicleTypeForm!: FormGroup;
  schemaName = 'tiposvehiculos';
  loading!: boolean;
  vehicleType!: VehicleType;

  @Input() id!: string;

  @Output() addNewVehicleType = new EventEmitter<VehicleType>();
  @Output() updateVehicleType = new EventEmitter<VehicleType>();
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
      this.getVehicleType();
    } else {
      this.formInit();
    }
  }

  getVehicleType() {
    this.loading = true;
    this.hs
      .get(
        `entities/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}/${this.id}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === false) {
            this.loading = false;
            console.log('Error al cargar el tipo de vehiculo');
          } else {
            this.vehicleType = resp.data;
            this.loading = false;
            this.setValues();
          }
        },
        (err) => {}
      );
  }

  onCreate(vehicleType: VehicleType) {
    if (this.vehicleTypeForm.valid) {
      this.addNewVehicleType.emit(vehicleType);
      this.onReset();
    }
  }

  onUpdate(vehicleType: VehicleType) {
    if (this.vehicleTypeForm.valid) {
      this.updateVehicleType.emit(vehicleType);
    }
  }

  formInit() {
    return (this.vehicleTypeForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    }));
  }

  setValues() {
    this.vehicleTypeForm.patchValue({
      descripcion: this.vehicleType.descripcion,
    });
  }

  onReset(): void {
    this.vehicleTypeForm.reset();
  }

  onResetId() {
    this.resetId.emit(this.id);
  }
}
