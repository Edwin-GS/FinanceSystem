import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoSolicitudes } from 'projects/libraries/helpers/src/lib/models/prestamo-solicitudes';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-loan-request-details',
  templateUrl: './loan-request-details.component.html',
  styleUrls: ['./loan-request-details.component.css'],
})
export class LoanRequestDetailsComponent {
  userData = this.usr.getLocalStorage();
  schemaName = 'prestamosolicitudes';
  baseUrl: string = `${this.userData?.userdata.name}/${this.schemaName}/${this.userData?.app}`;
  isLoading!: boolean;
  clientId!: string;
  loandRequestId!: string;
  loanRequest!: PrestamoSolicitudes;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly hs: HandlerService,
    private usr: UserService,
    private readonly nv: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.clientId = params['clientId'];
      this.loandRequestId = params['loanRequestId'];
      this.getLoanRequest(this.loandRequestId);
    });
  }

  getLoanRequest(loandRequestId: string): void {
    this.isLoading = true;
    this.hs
      .get(`entities/${this.baseUrl}/${loandRequestId}`)
      .subscribe((res) => {
        if (!res.data) {
          this.isLoading = false;
          console.log('Hubo un error o no se encontraron datos');
        } else {
          this.loanRequest = res.data;
          this.isLoading = false;
        }
      });
  }

  goToDetails(clientId: string | undefined) {
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/loan-request`,
      clientId,
    ]);
  }
}
