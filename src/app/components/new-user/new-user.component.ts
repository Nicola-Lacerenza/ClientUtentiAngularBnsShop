import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthappService } from '../../services/authapp.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit {

  constructor(private auth:AuthappService) {}

  ngOnInit(): void {
    
  }

  titolo : string="Creazione Nuovo Utente";

  sottotitolo : string="Procedi ad inserire i dati richiesti";

  public doRegister(form:NgForm):void{
    if(form.valid){
      console.log(form.value);
      this.auth.doRegister(form.value).subscribe({
        next:(response:any)=>{
          console.log(response);
        },
        error:(error:HttpErrorResponse)=>{
          console.error(error);
        }
      });
    }
  }

}
