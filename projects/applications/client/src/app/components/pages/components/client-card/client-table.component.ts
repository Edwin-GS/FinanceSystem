import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Client } from 'projects/libraries/helpers/src/lib/models/client.doc';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientCardComponent {
  @Input()  clients: (Client | undefined)[] = [];
  @Input()  action!: string
  @Input()  selection!: Client | undefined
  @Output() selectedActionClientEmitter = new EventEmitter<any>();
  @Output() deleteClientEvent = new EventEmitter<string>();
  
  selectProp(client: Client | undefined): void{
    this.selection = client
    const clientOperation = {selection: client, action: 'Actualizar cliente'}
    this.selectedActionClientEmitter.emit( clientOperation );
  }

  onDeleteProp(id: string | undefined): void{
    this.deleteClientEvent.emit( id )
  }
}
