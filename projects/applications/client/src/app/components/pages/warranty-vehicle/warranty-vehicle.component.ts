import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { WarrantyVehicle } from 'projects/libraries/helpers/src/lib/models/warranty-vehicle.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-warranty-vehicle',
  templateUrl: './warranty-vehicle.component.html',
  styleUrls: ['./warranty-vehicle.component.css'],
})
export class WarrantyVehicleComponent implements OnInit {
  userData = this.usr.getLocalStorage();
  baseUrl: string = `${this.userData?.userdata.name}/clientes/${this.userData?.app}`;
  schemaName = 'garantiavehiculos';
  isLoading!: boolean;
  clientId!: string;
  id!: string;
  warrantyVehicles: WarrantyVehicle[] = [];

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
    });
    this.getClient(this.clientId);
  }

  getClient(clientId: string): void {
    this.isLoading = true;
    this.hs.get(`entities/${this.baseUrl}/${clientId}`).subscribe((res) => {
      if (!res.data) {
        this.isLoading = false;
        console.log('Hubo un error o no se encontraron datos');
      } else {
        this.warrantyVehicles = [...res.data.garantiavehiculos];
        this.isLoading = false;
      }
    });
  }

  onCreate(vehicle: WarrantyVehicle) {
    this.hs
      .post(
        vehicle,
        `entities/create/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === true) {
            this.getClient(this.clientId);
            this.toast.success('Vehiculo agregado');
          } else {
            this.toast.error(
              'Error al intentar agregar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al agregar el vehiculo: ' + err);
        }
      );
  }

  goToDetails(clientId: string | undefined, vehicleId: string | undefined) {
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/warranty-vehicle-details`,
      clientId,
      vehicleId,
    ]);
  }
}
