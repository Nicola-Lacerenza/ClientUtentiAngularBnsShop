import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddModelComponent } from '../components/add-model/add-model.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpManagerService {
  private dialog : MatDialog;
  constructor() {
    this.dialog=inject(MatDialog);
  }

  public openForm(): void{
    this.dialog.open(AddModelComponent);
  }

  public closeForm():void{
    this.dialog.closeAll();
  }
}
