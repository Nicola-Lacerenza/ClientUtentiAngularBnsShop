import { Component,OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthappService } from '../../services/authapp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  errMsg: string = "";    

  titolo : string="Accesso & Autentificazione";

  sottotitolo : string="Procedi ad inserire la UserId e la Password";

  constructor(private route: Router, private BasicAuth:AuthappService) { }

  ngOnInit(): void {
  }
  
   public loginNow(form:NgForm){
      if(form.valid){

        this.errMsg = "";  

        this.BasicAuth.doLogin(form.value).subscribe({
          next:(response:ServerResponse)=>{
            this.BasicAuth.setLogged(<string>response.message);
          },
          error:(error:HttpErrorResponse)=>{
            console.error(error);
            this.errMsg = "Spiacente, la userId e/o la password sono errati";
          }
        })
      }
   }
}
