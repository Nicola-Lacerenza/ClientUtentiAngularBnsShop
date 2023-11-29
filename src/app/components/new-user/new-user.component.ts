import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }

  titolo : string="Creazione Nuovo Utente";

  sottotitolo : string="Procedi ad inserire i dati richiesti";


}
