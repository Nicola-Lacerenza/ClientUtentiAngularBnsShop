import { Component, OnInit } from '@angular/core';
import { AuthappService } from '../../services/authapp.service';
import { Router } from '@angular/router';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  userInitials: string = 'NL';
  userName: string = 'Nicola Lacerenza';
  menuItems = [
    { label: 'I miei ordini', value: 'ordini' },
    { label: 'I miei resi', value: 'resi' },
    { label: 'I miei dettagli', value: 'dettagli' },
    { label: 'Cambia password', value: 'password' },
    { label: 'Indirizzi', value: 'indirizzi' },
    { label: 'I miei metodi di pagamento', value: 'pagamenti' },
  ];

  // Variabile per tenere traccia dell'opzione selezionata
  selectedTab: string = '';

  constructor(
    private auth: AuthappService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Imposta una tab di default, se necessar
    this.auth.getUser().subscribe({
      next: (data: ServerResponse) => {
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.auth.doLogout();
        } else {
          console.error(error);
        }
      }
    });
  }

  selectTab(tab: string, event?: Event): void {
    if (event) {
      event.preventDefault(); // Previene il comportamento di default del link
    }
    this.selectedTab = tab;
  }
  
}
