import { Component , OnInit } from '@angular/core';
import { AuthappService } from '../../../services/authapp.service';
import { user } from './../../../models/user';
import { UserRegister } from '../../../models/UserRegister.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  private _utente !: UserRegister;

  constructor(public BasicAuth: AuthappService){}

  public get utente():UserRegister{
    return this._utente;
  }
  
  ngOnInit(): void {}

  public isLogged():boolean{
    return this.BasicAuth.isLogged();
  }
}


