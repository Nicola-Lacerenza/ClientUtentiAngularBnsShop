import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PopUpManagerService {
  private dialog : MatDialog;
  constructor() {
    this.dialog=inject(MatDialog);
  }

  // Metodo generalizzato per aprire qualsiasi dialogo
  public openForm<T>(component: T, _action : string , _id :number | undefined): void {
    this.dialog.open(component as any,{
      data : {
        _action : _action,
        _id : _id
      }
    });  // 'as any' è necessario per evitare errori di tipo
  }

  //public closeForm():void{
  //  this.dialog.closeAll();
  //}

  public closeForm(componentToClose?: any): void {
    if (componentToClose) {
      // Chiudi il dialog specifico se viene passato un componente
      this.dialog.getDialogById(componentToClose.id)?.close();
    } else {
      // Chiudi tutti i dialog se non viene passato nessun componente
      this.dialog.closeAll();
    }
  }

}
