import { Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { AuthappService } from '../../services/authapp.service';
import { BrandService } from '../../services/brand.service';
import { NgForm } from '@angular/forms';
import { ServerResponse } from './../../models/ServerResponse.interface';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent {


  constructor(@Inject(MAT_DIALOG_DATA) private _id:number| undefined, private auth:AuthappService,private brandService: BrandService,private popUp:PopUpManagerService){
  }

  public insertBrand(form:NgForm){
    
      if(form.valid){
        this.brandService.insertBrand(form.value).subscribe({         
          next:(data:ServerResponse)=>{
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

