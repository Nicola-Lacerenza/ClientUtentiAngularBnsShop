import { Component,OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  userId : String="Nicola";
  password : String="";

  autenticato : boolean= true;
  errMsg : string="Spiacente, la userId e/o la password sono errati";
  
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  gestAuth = () : void => {
    console.log(this.userId);

    if (this.userId==="Nicola"&& this.password ==="123"){
      this.route.navigate(['welcome',this.userId]);

      this.autenticato= true;
      
    } else {
      this.autenticato= false;
      
    }
  }
}
