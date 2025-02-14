import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PopUpManagerService {
  private dialog : MatDialog;
  constructor() {
    this.dialog=inject(MatDialog);
  }

  // Metodo generalizzato per aprire qualsiasi dialogo
  public openForm<T>(component: T, _id :number | undefined) : MatDialogRef<any,any> {
    const dialogOpened = this.dialog.open(component as any,{
      data : {
        _id : _id
      }
    });  // 'as any' è necessario per evitare errori di tipo
    return dialogOpened;
  }

  //public closeForm():void{
  //  this.dialog.closeAll();
  //}

  public closeForm(componentToClose?: any): void {
    if (componentToClose) {
      // Chiudi il dialog specifico se viene passato un componente
      this.dialog.getDialogById(componentToClose.id)?.close("MESSAGGIO DI PROVA");
    } else {
      // Chiudi tutti i dialog se non viene passato nessun componente
      this.dialog.closeAll();
    }
  }

}
