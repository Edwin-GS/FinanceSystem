import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  @Input() id!: string | undefined;
  @Output() deleteBrand = new EventEmitter<string>();

  onDeleteBrand(id: string | undefined) {
    this.deleteBrand.emit(id);
  }
}
