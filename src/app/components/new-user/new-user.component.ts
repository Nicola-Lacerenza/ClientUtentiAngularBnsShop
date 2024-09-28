import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthappService } from '../../services/authapp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit {

  private _message:string;
  @Output() registrationSuccess:EventEmitter<string>;

  constructor(private auth:AuthappService,private router:Router) {
    this.registrationSuccess=new EventEmitter<string>();
    this._message="";
  }

  public get message():string{
    return this._message;
  }

  ngOnInit(): void {
    
  }

  titolo : string="Creazione Nuovo Utente";

  sottotitolo : string="Procedi ad inserire i dati richiesti";

  public doRegister(form:NgForm):void{
    if(form.valid){
      this.auth.doRegister(form.value).subscribe({
        next:(response:ServerResponse)=>{
          this.registrationSuccess.emit(<string>response.message);
          this.router.navigateByUrl("/");
        },
        error:(error:HttpErrorResponse)=>{
          console.log(error,error.status,error.statusText);
          this._message=error.error.message;
        }
      });
    }
  }

}
