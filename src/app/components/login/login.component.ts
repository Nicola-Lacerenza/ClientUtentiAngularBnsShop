import { Component,OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthappService } from '../../../services/authapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  userId : string="";
  password : string="";

  autenticato : boolean= true;
  errMsg : string="Spiacente, la userId e/o la password sono errati";
  
  titolo : string="Accesso & Autentificazione";

  sottotitolo : string="Procedi ad inserire la UserId e la Password";

  constructor(private route: Router, private BasicAuth:AuthappService) { }

  ngOnInit(): void {
  }

  gestAuth = () : void => {
    console.log(this.userId);

    if (this.BasicAuth.autentica(this.userId, this.password)){
      this.route.navigate(['welcome',this.userId]);

      this.autenticato= true; 
      
    } else {
      this.autenticato= false;
      
    }
  }
}
