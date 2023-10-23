import { Component, OnInit } from '@angular/core';
import { Brand } from 'projects/libraries/helpers/src/lib/models/brand.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
})
export class MarcaComponent implements OnInit {
  pageTitle = 'Marcas';
  marcas: Brand[] = [];
  userData = this.usr.getLocalStorage();

  constructor(private usr: UserService, private hs: HandlerService) {}

  ngOnInit(): void {
    this.hs
      .get(
        `entities/${this.userData?.userdata.name}/marcas/${this.userData?.app}`
      )
      .subscribe((resp) => {
        if (resp['success'] === false) {
          console.log('Error al cargar las aplicaciones');
        } else {
          this.marcas = [...resp.data];
        }
      });
  }
}
