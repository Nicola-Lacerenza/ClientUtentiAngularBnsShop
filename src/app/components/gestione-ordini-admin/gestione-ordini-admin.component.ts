// gestione-ordini-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { ResoService } from '../../services/reso.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Reso } from '../../models/reso.interface';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { OrdineService } from '../../services/ordine.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestione-ordini-admin',
  templateUrl: './gestione-ordini-admin.component.html',
  styleUrls: ['./gestione-ordini-admin.component.css']
})
export class GestioneOrdiniAdminComponent implements OnInit {
  resi : Reso[] = [];
  statusFilter: 'IN ATTESA DI APPROVAZIONE' | 'IN ATTESA DI RICEZIONE' | 'APPROVATO E RIMBORSATO' | 'NEGATO' = 'IN ATTESA DI APPROVAZIONE';
  searchTerm: string = '';

  constructor(
    private resoService : ResoService,
    private ordineService : OrdineService,
    private popUp: PopUpManagerService,
    ) {}


  ngOnInit(): void {
    this.getResi();
  }

  private async getResi() {
    this.resoService.getResi()
    .then((response: Observable<Promise<Reso[]>>) => {
      response.subscribe({
        next: async (response : Promise<Reso[]>) => {
          this.resi = await response;
          console.log('Resi recuperati:', this.resi);
        },
        error: (error : HttpErrorResponse) => {
          console.error('Errore durante il recupero dei resi:', error);
        }
      });
    });
  }

  applyFilters(): void {
    //this.filteredReturns = this.resi
    //  .filter(r => this.statusFilter === 'IN ATTESA DI APPROVAZIONE' || r.stato_reso === this.statusFilter)
    //.filter(r => !this.searchTerm || r.id_ordine.toLowerCase().includes(this.searchTerm.toLowerCase()) || r.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  onStatusFilterChange(newStatus: any): void {
    this.statusFilter = newStatus;
    this.applyFilters();
  }

  onSearchTermChange(newTerm: string): void {
    this.searchTerm = newTerm;
    this.applyFilters();
  }

  approveReturn(id: number): void {
    //this.popUp.openForm(GestioneOrdiniInviaEmailComponent, { recipient : this.});
  }

  rejectReturn(id: number, comment: string = ''): void {
  }

  completeReturn(id: number): void {
  }

  downloadLabel(id: number): void {
  }

  issueRefund(id: number): void {
  }
}
