import { Component, Inject, inject, OnInit } from '@angular/core';
import { AuthappService } from '../../services/authapp.service';
import { CategoriaService } from '../../services/categoria.service';
import { NgForm } from '@angular/forms';
import { ServerResponse } from './../../models/ServerResponse.interface';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from './../../models/categoria.interface';

@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrl: './update-categoria.component.css'
})
export class UpdateCategoriaComponent implements OnInit{

  public actualName : string = '';
  public actualTarget : string = '';

  ngOnInit(): void {
        if(!this.data._id) return;
        this.categoriaService.getCetegoria(this.data._id).subscribe({
          next:(data:ServerResponse)=>{
            const categoria : Categoria = <Categoria>data.message;
            this.actualName = categoria.nome_categoria;
            this.actualTarget = categoria.target;
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

  constructor(@Inject(MAT_DIALOG_DATA) private data : {_id:number|undefined}, private auth:AuthappService,private categoriaService: CategoriaService,private popUp:PopUpManagerService){
  }

  public updateCategoria(form:NgForm){
    if(form.valid && this.data._id){
      this.categoriaService.updateCategoria(this.data._id,form.value).subscribe({         
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
