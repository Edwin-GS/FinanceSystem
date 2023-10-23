import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'projects/libraries/helpers/src/lib/models/brand.doc';

@Component({
  selector: 'app-marca-table',
  templateUrl: './marca-table.component.html',
  styleUrls: ['./marca-table.component.css'],
})
export class MarcaTableComponent {
  @Input() marcas: Brand[] = [];
}
