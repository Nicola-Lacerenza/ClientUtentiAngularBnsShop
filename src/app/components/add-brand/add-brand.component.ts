import { Component } from '@angular/core';
import { AuthappService } from '../../services/authapp.service';
import { BrandService } from '../../services/brand.service';
import { NgForm } from '@angular/forms';
import { ServerResponse } from './../../models/ServerResponse.interface';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerRequest } from '../../models/ServerRequest.interface';
import { Brand } from './../../models/brand.interface';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent {

  constructor(private auth:AuthappService,private brandService: BrandService,private popUp:PopUpManagerService){
  }

  public inserisciBrand(form:NgForm){
      if(form.valid){
        const newBrand : Brand={id:0,nome:form.value.nome,descrizione:form.value.descrizione};
        const dataRequest : ServerRequest={body:newBrand};
        console.log(form);
        this.brandService.inserisciBrand(dataRequest).subscribe({         
          next:(data:ServerResponse)=>{
            console.log(data);
            form.reset();
            this.popUp.closeForm();
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

