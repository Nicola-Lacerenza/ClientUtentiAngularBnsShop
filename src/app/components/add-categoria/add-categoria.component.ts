import { Component } from '@angular/core';
import { AuthappService } from '../../services/authapp.service';
import { CategoriaService } from '../../services/categoria.service';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { NgForm } from '@angular/forms';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.css'
})
export class AddCategoriaComponent {

  constructor(private auth:AuthappService,private brandService: CategoriaService,private popUp:PopUpManagerService){
  }

  public insertCategoria(form:NgForm){
    
      if(form.valid){
        this.brandService.insertCategoria(form.value).subscribe({         
          next:(data:ServerResponse)=>{
            form.reset();
            this.popUp.closeForm(AddCategoriaComponent);
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

}

