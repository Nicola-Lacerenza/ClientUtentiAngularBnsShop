import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBrandComponent } from '../components/add-brand/add-brand.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpManagerService {
  private dialog : MatDialog;
  constructor() {
    this.dialog=inject(MatDialog);
  }

  public openForm(): void{
    this.dialog.open(AddBrandComponent);
  }

  public closeForm():void{
    this.dialog.closeAll();
  }
}
