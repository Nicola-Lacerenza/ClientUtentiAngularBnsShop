import { Component , OnInit } from '@angular/core';
import { AuthappService } from '../../../services/authapp.service';
import { user } from './../../../models/user';
import { UserRegister } from '../../../models/UserRegister.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  private _utente !: UserRegister;
  private _isAdmin : boolean;

  constructor(public BasicAuth: AuthappService){
    this._isAdmin=false;
  }

  public get utente():UserRegister{
    return this._utente;
  }
  
  ngOnInit(): void {}

  public isLogged():boolean{
    return this.BasicAuth.isLogged();
  }

  public get isAdmin(): boolean{
    this.BasicAuth.isAdmin().subscribe({
      next:(ruolo:boolean)=>{
        this._isAdmin=ruolo;
      },
      error:(error:HttpErrorResponse)=>{
        this._isAdmin=false;
        console.error(error);
      }
    });
    return this._isAdmin;
  }
}