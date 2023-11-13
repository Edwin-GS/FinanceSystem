import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { WarrantyVehicle } from 'projects/libraries/helpers/src/lib/models/warranty-vehicle.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-warranty-vehicle-details',
  templateUrl: './warranty-vehicle-details.component.html',
  styleUrls: ['./warranty-vehicle-details.component.css'],
})
export class WarrantyVehicleDetailsComponent {
  userData = this.usr.getLocalStorage();
  schemaName = 'garantiavehiculos';
  baseUrl: string = `${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}`;
  isLoading!: boolean;
  clientId!: string;
  vehicleId!: string;
  warrantyVehicle!: WarrantyVehicle;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly hs: HandlerService,
    private usr: UserService,
    private toast: HotToastService,
    private readonly nv: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.clientId = params['clientId'];
      this.vehicleId = params['vehicleId'];
      this.getVehicle(this.vehicleId);
    });
  }

  getVehicle(vehicleId: string): void {
    this.isLoading = true;
    this.hs.get(`entities/${this.baseUrl}/${vehicleId}`).subscribe((res) => {
      if (!res.data) {
        this.isLoading = false;
        console.log('Hubo un error o no se encontraron datos');
      } else {
        this.warrantyVehicle = res.data;
        this.isLoading = false;
      }
    });
  }

  onUpdate(vehicle: WarrantyVehicle) {
    this.hs
      .put(
        vehicle,
        `entities/update/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}/${this.vehicleId}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === true) {
            this.toast.success('vehiculo actualizado');
            this.getVehicle(this.vehicleId);
          } else {
            this.toast.error(
              'Error al intentar actualizar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al actualizar el vehiculo: ' + err);
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
            this.toast.success('Vehiculo eliminado');
            this.goToDetails(this.clientId);
          } else {
            this.toast.error(
              'Error al intentar eliminar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al eliminar el vehiculo: ' + err);
        }
      );
  }

  goToDetails(clientId: string | undefined) {
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/warranty-vehicle`,
      clientId,
    ]);
  }
}
