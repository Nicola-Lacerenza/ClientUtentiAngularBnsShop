
import { Component, OnInit } from '@angular/core';
import { AuthappService } from '../../services/authapp.service';
import { Router } from '@angular/router';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { UserRegister } from '../../models/UserRegister.interface';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private auth: AuthappService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe({         
      next:(data:ServerResponse)=>{
        console.log(data);
      },
      error:(error:HttpErrorResponse)=>{
        if(error.status===401 || error.status===403){
          this.auth.doLogout();
        }else{
          //Gestire l'errore
          console.error(error);
        }
      }
    })
  }
}
