import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Properties } from 'projects/libraries/helpers/src/lib/models/properties.doc';

@Component({
  selector: 'app-propiedades-table',
  templateUrl: './prop-table.component.html',
  styleUrls: ['./prop-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropsTableComponent {
  @Input()  id!: string
  @Input()  userData!: any
  @Input()  props: (Properties | undefined)[] = [];
  @Input()  action!: string
  @Input()  selection!: Properties | undefined
  @Output() selectedActionPropEmitter = new EventEmitter<any>();
  @Output() deletePropEvent = new EventEmitter<string>();
  @Output() createPropEmitter = new EventEmitter<Properties>();
  @Output() updatePropEmitter = new EventEmitter<Properties>();
  
  constructor(
    private readonly nv: Router,
  ){}

  selectProp(property: Properties | undefined): void{
    this.selection = property
    const prop = {selection: property, action: 'Actualizar propiedad'}
    console.log('props', this.props);
    this.selectedActionPropEmitter.emit(prop);
  }

  onDeleteProp(id: string | undefined): void{
    this.deletePropEvent.emit( id )
  }

  goToUpdate(){
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
      ${this.userData?.userdata.id}/properties/${this.id}/update/${ this.selection?._id}`
    ])
  }
  
}
