import { Component, OnInit } from '@angular/core';
import { AuthappService } from '../../../services/authapp.service';
import { UserRegister } from '../../../models/UserRegister.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  // Usa styleUrls (con la "s")
})
export class HeaderComponent implements OnInit {
  public utente!: UserRegister;
  public adminUser: boolean = false; // Proprietà modificabile per il ruolo admin
  public loggedIn: boolean = false;  // Proprietà per lo stato di login

  constructor(public basicAuth: AuthappService) {}

  ngOnInit(): void {
    // Imposta lo stato di login all'avvio
    this.loggedIn = this.basicAuth.isLogged();

    // Sottoscrivi il risultato dell'osservabile per l'admin
    this.basicAuth.isAdmin().subscribe({
      next: (ruolo: boolean) => {
        this.adminUser = ruolo;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this.adminUser = false;
      }
    });
  }
}
