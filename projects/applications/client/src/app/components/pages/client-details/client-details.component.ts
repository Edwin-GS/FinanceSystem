import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Client } from 'projects/libraries/helpers/src/lib/models/client.doc';
import { PrestamoSolicitudes } from 'projects/libraries/helpers/src/lib/models/prestamo-solicitudes';
import { Profession } from 'projects/libraries/helpers/src/lib/models/profession.doc';
import { Properties } from 'projects/libraries/helpers/src/lib/models/properties.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
  id!: string;
  userData = this.usr.getLocalStorage();
  isLoading!: boolean;
  title: string = 'Detalle cliente';
  client!: Client;
  baseUrl: string = `${this.userData?.userdata.name}/clientes/${this.userData?.app}`;

  profession!: (Profession | undefined)
  profUrl: string = `${this.userData?.userdata.name}/profesiones/${this.userData?.app}`
  
  solicitudes!: (PrestamoSolicitudes | undefined)[]
  propiedades!: (Properties | undefined)[]
  vehiculos: any

  idProp!: string | undefined;

  // Vehiculos 
  // garantiavehiculos!: (Properties | undefined)[]

  constructor(
    private readonly router: ActivatedRoute,
    private readonly hs: HandlerService,
    private toast: HotToastService,
    private readonly nv: Router,
    private usr: UserService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getClient(this.id);
    // this.getProfession( this.client.profesiones_id )
  }

  getClient(id: string): void {
    this.isLoading = true;
    this.hs.get(`entities/${this.baseUrl}/${id}`).subscribe((res) => {
      if (!res.data) {
        this.isLoading = false;
        console.log('Hubo un error o no se encontraron datos');
      } else {
        this.isLoading = false;
        this.client = res.data;
        this.getProfession(res.data.profesiones_id);
        this.propiedades = res.data.propiedades;
        this.solicitudes = res.data.prestamosolicitudes;
      }
      console.log('selection', res);
    });
  }

  getProfession(profesionID: string): void {
    this.isLoading = true;
    this.hs.get(`entities/${this.profUrl}`, profesionID).subscribe((res) => {
      if (!res.data) {
        this.isLoading = false;
        console.log('Hubo un error o no se encontraron datos');
      } else {
        this.isLoading = false;
        this.profession = res.data;
      }
      console.log('prof', this.profession);
    });
  }

  onDeleteProperty( id: string ){
    this.hs.delete(`entities/delete/${this.userData?.userdata.name}
    /propiedades/${this.userData?.app}`, id)
      .subscribe((resp) => {
        if(resp["success"] == false ){
          console.log('Error', resp);
          this.toast.error(
            'Error al intentar eliminar, por favor, intente de nuevo'
          );
        } else{
          this.toast.success('Propiedad eliminada');
          const currentProp = this.propiedades.filter( props => props?._id !== id)
          this.propiedades = [...currentProp]
        }
      })
  }

  goToWarrantyVehicle(id: string | undefined) {
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/warranty-vehicle`,
      id,
    ]);
  }

  goToSolicitud(id: string | undefined) {
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/solicitud-prestamos`,
      id,
    ]);
  }

  goToPropUpdate(id: string | undefined){
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
      ${this.userData?.userdata.id}/properties/${this.id}/update/${ id }`
    ])
  }

  goToProperties(id: string | undefined) {
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/properties`,
      id,
    ]);
  }

  goBack() {
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/clients`,
    ]);
  }
}
