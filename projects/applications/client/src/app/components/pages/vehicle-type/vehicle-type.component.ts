import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { VehicleType } from 'projects/libraries/helpers/src/lib/models/vehicletype.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css'],
})
export class VehicleTypeComponent implements OnInit {
  vehicleTypes: VehicleType[] = [];
  isLoading!: boolean;
  userData = this.usr.getLocalStorage();
  schemaName = 'tiposvehiculos';
  id!: string;

  constructor(
    private usr: UserService,
    private hs: HandlerService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.getVehicleTypes();
  }

  getVehicleTypes() {
    this.isLoading = true;
    this.hs
      .get(
        `entities/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}`
      )
      .subscribe((resp) => {
        if (resp['success'] === false) {
          this.isLoading = false;
          console.log('Error al cargar los modelos');
        } else {
          this.isLoading = false;
          this.vehicleTypes = [...resp.data];
        }
      });
  }

  onCreate(vehicleType: VehicleType) {
    this.hs
      .post(
        vehicleType,
        `entities/create/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === true) {
            this.getVehicleTypes();
            this.toast.success('Tipo de vehiculo agregado');
          } else {
            this.toast.error(
              'Error al intentar agregar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al agregar el tipo de vehiculo: ' + err);
        }
      );
  }

  onUpdate(vehicleType: VehicleType) {
    this.hs
      .put(
        vehicleType,
        `entities/update/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}/${this.id}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === true) {
            this.toast.success('Tipo de vehiculo actualizado');
            this.getVehicleTypes();
          } else {
            this.toast.error(
              'Error al intentar actualizar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al actualizar el tipo de vehiculo: ' + err);
        }
      );
  }

  onDelete(id: string) {
    this.hs
      .delete(
        `entities/delete/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}/${id}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === true) {
            this.toast.success('Tipo de vehiculo eliminado');
            this.onResetId();
            this.getVehicleTypes();
          } else {
            this.toast.error(
              'Error al intentar eliminar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al eliminar el tipo de vehiculo: ' + err);
        }
      );
  }

  onResetId() {
    this.id = '';
  }
}
