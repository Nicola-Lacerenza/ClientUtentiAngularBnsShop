import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthappService } from '../../services/authapp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Router } from '@angular/router';
import { TagliaService } from '../../services/taglia.service';
import { Colore } from '../../models/colore.interface';
import { ColoreService } from '../../services/colore.service';
import { Taglia } from '../../models/taglia.interface';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit {
  public _taglie: Taglia[] = [];
  public _colori: Colore[] = [];
  public selectedTaglia: number|null = null;
  public selectedColore: number|string = '';            

  private _message:string;
  @Output() registrationSuccess:EventEmitter<string>;

  constructor(
    private auth:AuthappService,
    private router:Router,
    private tagliaService: TagliaService,
    private coloreService: ColoreService,
  ){
    this.registrationSuccess=new EventEmitter<string>();
    this._message="";
  }

  public get message():string{
    return this._message;
  }

  ngOnInit(): void {
    this.getTaglia();
    this.getColore();
  }


  titolo : string="Creazione Nuovo Utente";

  sottotitolo : string="Procedi ad inserire i dati richiesti";


  
  private getTaglia():void{
    this.tagliaService.getTaglie().subscribe({
        next: (data: ServerResponse) => {
          this._taglie = <Taglia[]>data.message;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            this.auth.doLogout();
          } else {
            console.error(error);
          }
        }
      });
    }

  private getColore():void{
    this.coloreService.getColori().subscribe({
      next: (data: ServerResponse) => {
        this._colori = <Colore[]>data.message;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.auth.doLogout();
        } else {
          console.error(error);
        }
      }
    });
  }


  public doRegister(form:NgForm):void{
    if(form.valid){
      this.auth.doRegister(form.value).subscribe({
        next:(response:ServerResponse)=>{
          this.registrationSuccess.emit(<string>response.message);
          //this.router.navigateByUrl("/");
          this.auth.setLogged(<string>response.message);
        },
        error:(error:HttpErrorResponse)=>{
          console.log(error,error.status,error.statusText);
          this._message=error.error.message;
        }
      });
    }
  }

}
