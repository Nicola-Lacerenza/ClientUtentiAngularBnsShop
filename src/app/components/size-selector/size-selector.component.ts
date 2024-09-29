import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-size-selector',
  templateUrl: './size-selector.component.html',
  styleUrls: ['./size-selector.component.css']
})
export class SizeSelectorComponent {
  showPopup = false;
  selectedSize: string = '';
  availableSizes = ['33', '36', '36.5', '37.5', '38']; // Taglie disponibili
  @Output() sizeSelected = new EventEmitter<string>();

  selectSize(size: string) {
    this.selectedSize = size;
  }

  confirmSize() {
    this.sizeSelected.emit(this.selectedSize);
    this.closePopup();
  }

  closePopup() {
    this.showPopup = false;
  }

  openPopup() {
    this.showPopup = true;
  }  
}
