import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Properties } from 'projects/libraries/helpers/src/lib/models/properties.doc';
import { observable } from 'rxjs';

@Component({
  selector: 'app-propiedades-table',
  templateUrl: './prop-table.component.html',
  styleUrls: ['../../components/marca-table/marca-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropsTableComponent {
  @Input()  props: (Properties | undefined)[] = [];
  @Input()  action!: string
  @Input()  selection!: Properties | undefined
  @Output() selectedActionPropEmitter = new EventEmitter<any>();
  @Output() deletePropEvent = new EventEmitter<string>();
  @Output() createPropEmitter = new EventEmitter<Properties>();
  @Output() updatePropEmitter = new EventEmitter<Properties>();
  
  selectProp(property: Properties | undefined): void{
    this.selection = property
    const prop = {selection: property, action: 'Actualizar propiedad'}
    console.log('props', this.props);
    this.selectedActionPropEmitter.emit(prop);
  }

  onCreateProp(prop: Properties ): void{
    this.createPropEmitter.emit( prop )
  }

  onDeleteProp(id: string | undefined): void{
    this.deletePropEvent.emit( id )
  }

  
}
