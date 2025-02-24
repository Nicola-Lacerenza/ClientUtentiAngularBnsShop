
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit {

  userInitials: string = 'NL';
  userName: string = 'Nicola Lacerenza';
  menuItems = [
    { label: 'I miei ordini', link: '#' },
    { label: 'I miei resi', link: '#' },
    { label: 'ASOS Premier', link: '#' },
    { label: 'ASOS Outlet', link: '#' },
    { label: 'Carte regalo e buoni', link: '#' },
    { label: 'I miei dettagli', link: '#' },
    { label: 'Cambia password', link: '#' },
    { label: 'Indirizzi', link: '#' },
  ];

  constructor() { }

  ngOnInit(): void {
    // In un caso reale, potresti caricare i dati dell'utente da un servizio
  }

}
