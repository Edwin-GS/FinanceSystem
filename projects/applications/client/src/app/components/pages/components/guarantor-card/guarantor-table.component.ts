import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'projects/libraries/helpers/src/lib/models/client.doc';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-guarantor-card',
  templateUrl: './guarantor-table.component.html',
  styleUrls: ['./guarantor-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuarantorCardComponent {
  @Input()  guarantors: (Client | undefined)[] = [];
  @Input()  action!: string
  @Input()  selection!: Client | undefined
  @Output() selectedActionClientEmitter = new EventEmitter<any>();
  @Output() deleteClientEvent = new EventEmitter<string>();
  userData = this.usr.getLocalStorage();
  baseUrl: string = `${this.userData?.userdata.name}/garantes/${this.userData?.app}`

  constructor( 
    private readonly router: Router,
    private usr: UserService,
    ){}
  
  selectProp(client: Client | undefined): void{
    this.selection = client
    const clientOperation = {selection: client, action: 'Actualizar cliente'}
    this.selectedActionClientEmitter.emit( clientOperation );
  }

  onDeleteProp(id: string | undefined): void{
    this.deleteClientEvent.emit( id )
  }

  // goToCreate(){
  //   this.router.navigate([
  //     `/finance-system/users/${this.userData?.userdata.name}/
  //     ${this.userData?.userdata._id}/garante`
  //   ])
  // }

  goToUpdate( id: string | undefined ){
    this.router.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
      ${this.userData?.userdata.id}/garantes`, id
    ])
  }
}
