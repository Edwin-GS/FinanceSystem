import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoSolicitudes } from 'projects/libraries/helpers/src/lib/models/prestamo-solicitudes';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css'],
})
export class LoanRequestComponent {
  userData = this.usr.getLocalStorage();
  baseUrl: string = `${this.userData?.userdata.name}/clientes/${this.userData?.app}`;
  isLoading!: boolean;
  clientId!: string;
  loanRequests: PrestamoSolicitudes[] | any = [];

  constructor(
    private readonly router: ActivatedRoute,
    private readonly hs: HandlerService,
    private readonly usr: UserService,
    private readonly nv: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.clientId = params['clientId'];
      console.log('clientid', this.clientId);
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
        this.loanRequests = [...res.data.prestamosolicitudes];
        this.isLoading = false;
      }
    });
  }

  goToNew(){
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/loan-request/${this.clientId}/0`
    ]);
  }

  // goToDetails(clientId: string | undefined, loanRequestId: string | undefined) {
  //   this.nv.navigate([
  //     `/finance-system/users/${this.userData?.userdata.name}/
  //       ${this.userData?.userdata.id}/loan-request-details`,
  //     clientId,
  //     loanRequestId,
  //   ]);
  // }

  goToUpdate(clientId: string | undefined, loanRequestId: string | undefined) {
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/loan-request/${clientId}/${loanRequestId}`,
    ]);
  }
}
