import { Component, Inject, inject, OnInit } from '@angular/core';
import { AuthappService } from '../../services/authapp.service';
import { BrandService } from '../../services/brand.service';
import { NgForm } from '@angular/forms';
import { ServerResponse } from './../../models/ServerResponse.interface';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from '../../models/brand.interface';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrl: './update-brand.component.css'
})
export class UpdateBrandComponent implements OnInit {

  public actualName : string = '';
  public actualDescription : string = '';

  ngOnInit(): void {
    if(!this.data._id) return;
    this.brandService.getBrand(this.data._id).subscribe({
      next:(data:ServerResponse)=>{
        const brand : Brand = <Brand>data.message;
        this.actualName = brand.nome;
        this.actualDescription = brand.descrizione;
      },
      error:(error:HttpErrorResponse)=>{
        if(error.status===401 || error.status===403){
          this.auth.doLogout();
        }else{
          //Gestire l'errore
          console.error(error);
        }
      }
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data : {_id:number|undefined}, private auth:AuthappService,private brandService: BrandService,private popUp:PopUpManagerService){
  }


  public updateBrand(form:NgForm){
    if(form.valid && this.data._id){
      this.brandService.updateBrand(this.data._id,form.value).subscribe({         
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
