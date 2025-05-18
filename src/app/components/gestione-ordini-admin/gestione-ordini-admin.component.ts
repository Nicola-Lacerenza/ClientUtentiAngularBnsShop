// gestione-ordini-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { ResoService } from '../../services/reso.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Reso } from '../../models/reso.interface';
import { Reso_Ricevuto_Server } from '../../models/reso_ricevuto_server.interface';

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
    private resoService : ResoService
    ) {}


  ngOnInit(): void {
    this.getResi();
  }

  private getResi() {
    this.resoService.getResi().subscribe({
      next: (response : Reso[]) => {
        this.resi = response;
        console.log('Resi recuperati:', this.resi);
      },
      error: (error : HttpErrorResponse) => {
        console.error('Errore durante il recupero dei resi:', error);
      }
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
