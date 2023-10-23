import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'projects/libraries/helpers/src/lib/models/application.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-mi-apps',
  templateUrl: './mi-apps.component.html',
  styleUrls: ['./mi-apps.component.css'],
})
export class MiAppsComponent implements OnInit {
  apps: Application[] = [];
  dashboard = 'finance-system/client/:user/:user_id';
  userData = this.usr.getLocalStorage();

  constructor(
    private router: Router,
    private hs: HandlerService,
    private usr: UserService
  ) {}

  ngOnInit(): void {
    this.hs
      .get(`applications/${this.userData?.userdata.name}`)
      .subscribe((resp) => {
        if (resp['success'] === false) {
          console.log('Error al cargar las aplicaciones');
        } else {
          this.apps = [...resp.data];
        }
      });
  }

  onSelectedApp(_id: string): void {
    if (!_id) {
      return;
    }

    localStorage.setItem('APP', _id);

    const user = this.userData?.userdata.name;
    const userId = this.userData?.userdata.id;

    const updatedDashboard = this.dashboard
      .replace(':user', user)
      .replace(':user_id', userId);
    // Redirigimos al usuario a su panel de control después de seleccionar la application
    this.router.navigate([updatedDashboard, { user, userId }]);
  }
}
