// gestione-ordini-admin.component.ts
import { Component, OnInit } from '@angular/core';

interface ReturnItem {
  productId: number;
  name: string;
  quantity: number;
  reason: string;
}

interface ReturnRequest {
  id: number;
  orderNumber: string;
  customerName: string;
  dateRequested: Date;
  status: 'requested' | 'approved' | 'rejected' | 'completed';
  items: ReturnItem[];
  labelUrl?: string;
  adminComment?: string;
}

@Component({
  selector: 'app-gestione-ordini-admin',
  templateUrl: './gestione-ordini-admin.component.html',
  styleUrls: ['./gestione-ordini-admin.component.css']
})
export class GestioneOrdiniAdminComponent implements OnInit {
  allReturns: ReturnRequest[] = [];
  filteredReturns: ReturnRequest[] = [];
  statusFilter: 'all' | 'requested' | 'approved' | 'rejected' | 'completed' = 'all';
  searchTerm: string = '';

  ngOnInit(): void {
    this.loadMockReturns();
    this.applyFilters();
  }

  private loadMockReturns() {
    this.allReturns = [
      { id: 1, orderNumber: 'ORD-1001', customerName: 'Mario Rossi', dateRequested: new Date('2025-04-20'), status: 'requested', items: [{ productId: 101, name: 'Sneakers A', quantity: 1, reason: 'Taglia errata' }] },
      { id: 2, orderNumber: 'ORD-1002', customerName: 'Luisa Bianchi', dateRequested: new Date('2025-04-18'), status: 'approved', items: [{ productId: 102, name: 'Sandali B', quantity: 2, reason: 'Difetto materiale' }], labelUrl: 'https://example.com/labels/2.pdf' },
      // altri mock…
    ];
  }

  applyFilters(): void {
    this.filteredReturns = this.allReturns
      .filter(r => this.statusFilter === 'all' || r.status === this.statusFilter)
      .filter(r => !this.searchTerm || r.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) || r.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()));
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
    const ret = this.allReturns.find(r => r.id === id);
    if (ret && ret.status === 'requested') {
      ret.status = 'approved';
      ret.labelUrl = `https://example.com/labels/${id}.pdf`;
      this.applyFilters();
    }
  }

  rejectReturn(id: number, comment: string = ''): void {
    const ret = this.allReturns.find(r => r.id === id);
    if (ret && ret.status === 'requested') {
      ret.status = 'rejected';
      ret.adminComment = comment;
      this.applyFilters();
    }
  }

  completeReturn(id: number): void {
    const ret = this.allReturns.find(r => r.id === id);
    if (ret && ret.status === 'approved') {
      ret.status = 'completed';
      this.applyFilters();
    }
  }

  downloadLabel(id: number): void {
    const ret = this.allReturns.find(r => r.id === id);
    if (ret?.labelUrl) {
      window.open(ret.labelUrl, '_blank');
    }
  }

  issueRefund(id: number): void {
    const ret = this.allReturns.find(r => r.id === id);
    if (ret && ret.status === 'completed') {
      console.log(`Rimborso eseguito per reso ${id}`);
    }
  }
}
