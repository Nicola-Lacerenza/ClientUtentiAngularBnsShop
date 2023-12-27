import { Component,OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthappService } from '../../services/authapp.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  errMsg : string="Spiacente, la userId e/o la password sono errati";
  
  titolo : string="Accesso & Autentificazione";

  sottotitolo : string="Procedi ad inserire la UserId e la Password";

  constructor(private route: Router, private BasicAuth:AuthappService) { }

  ngOnInit(): void {
  }

  /*gestAuth = () : void => {
    console.log(this.userId);

    if (this.BasicAuth.autentica(this.userId, this.password)){
      this.route.navigate(['welcome',this.userId]);

      this.autenticato= true; 
      
    } else {
      this.autenticato= false;
      
    }
  }*/
   public loginNow(form:NgForm){
      console.log(form);
      if(form.valid){
        this.BasicAuth.doLogin(form.value).subscribe({
          next:(response:any)=>{
            console.log(response);
          },
          error:(error:HttpErrorResponse)=>{
            console.error(error);
          }
        })
      }
   }
}
