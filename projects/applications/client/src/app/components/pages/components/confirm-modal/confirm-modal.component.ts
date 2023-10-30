import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  @Input() id!: string;
  @Output() deleteBrand = new EventEmitter<string>();

  onDeleteBrand(id: string) {
    this.deleteBrand.emit(id);
  }
}
