import { Component } from '@angular/core';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
      <div class="overlay" *ngIf=" isLoading$ | async">
        <div class="lds-dual-ring"></div>
      </div>
  `,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent{
  isLoading$ = this.spinnerSrv.isLoading$
  constructor( private spinnerSrv: SpinnerService){};
  // isLoading$ =  this.loadingSrv.isLoading$ 

  
}
