import { Component, Inject, inject } from '@angular/core';
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

  constructor(@Inject(MAT_DIALOG_DATA) private _action:string,@Inject(MAT_DIALOG_DATA) private _id:number| undefined, private auth:AuthappService,private brandService: BrandService,private popUp:PopUpManagerService){
  }

  public get action():string{
    return this._action;
  }

  public insertBrand(form:NgForm){
    
      if(form.valid){
        this.brandService.insertBrand(form.value).subscribe({         
          next:(data:ServerResponse)=>{
            form.reset();
            this.popUp.closeForm(AddBrandComponent);
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

  public updateBrand(form:NgForm){
    if(form.valid && this._id){
      this.brandService.updateBrand(this._id,form.value).subscribe({         
        next:(data:ServerResponse)=>{
          form.reset();
          this.popUp.closeForm(AddBrandComponent);
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

