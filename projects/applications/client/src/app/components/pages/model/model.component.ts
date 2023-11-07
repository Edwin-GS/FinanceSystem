import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Model } from 'projects/libraries/helpers/src/lib/models/model.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
})
export class ModelComponent implements OnInit {
  models: Model[] = [];
  isLoading!: boolean;
  userData = this.usr.getLocalStorage();
  schemaName = 'modelos';
  id!: string;

  constructor(
    private usr: UserService,
    private hs: HandlerService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.getModels();
  }

  getModels() {
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
          this.models = [...resp.data];
        }
      });
  }

  onCreate(model: Model) {
    this.hs
      .post(
        model,
        `entities/create/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === true) {
            this.getModels();
            this.toast.success('Modelo agregado');
          } else {
            this.toast.error(
              'Error al intentar agregar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al agregar el modelo: ' + err);
        }
      );

    console.log(model, 'Creating');
  }

  onUpdate(model: Model) {
    this.hs
      .put(
        model,
        `entities/update/${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}/${this.id}`
      )
      .subscribe(
        (resp) => {
          if (resp['success'] === true) {
            this.toast.success('Modelo actualizado');
            this.getModels();
          } else {
            this.toast.error(
              'Error al intentar actualizar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al actualizar el modelo: ' + err);
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
            this.toast.success('Modelo eliminado');
            this.onResetId();
            this.getModels();
          } else {
            this.toast.error(
              'Error al intentar eliminar por favor intente de nuevo'
            );
          }
        },
        (err) => {
          console.error('Error al eliminar el modelo: ' + err);
        }
      );
  }

  onResetId() {
    this.id = '';
  }
}
