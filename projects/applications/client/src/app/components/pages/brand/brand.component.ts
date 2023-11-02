import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'projects/libraries/helpers/src/lib/models/brand.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  userData = this.usr.getLocalStorage();
  schemaName = 'marcas';
  brands: Brand[] = [];
  selectedBrand!: Brand;
  _id!: string;
  isCreating!: boolean;
  isLoading!: boolean;

  constructor(
    private usr: UserService,
    private hs: HandlerService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.isLoading = true;
    this.hs
      .get(
        `entities/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}`
      )
      .subscribe((resp) => {
        if (resp['success'] === false) {
          this.isLoading = false;
          console.log('Error al cargar las marcas');
        } else {
          this.isLoading = false;
          this.brands = [...resp.data];
        }
      });
  }

  onCreate(nombre: string) {
    const data = { nombre: nombre };
    this.hs
      .post(
        data,
        `entities/create/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === true) {
            this.getBrands();
            this.toast.success('Marca agregada');
          } else {
            this.toast.error(
              'Error al intentar agragar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al agregar marca: ' + err);
        }
      );

    console.log(data, 'Creating');
  }

  onUpdate(brand: Brand) {
    this.hs
      .put(
        brand,
        `entities/update/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}/${brand._id}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === true) {
            this.getBrands();
            this.toast.success('Marca actualizada');
          } else {
            this.toast.error(
              'Error al intentar actualizar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al actualizar marca: ' + err);
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
            this.getBrands();
            this.toast.success('Marca eliminada');
          } else {
            this.toast.error(
              'Error al intentar eliminar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al eliminar marca: ' + err);
        }
      );
  }
}
