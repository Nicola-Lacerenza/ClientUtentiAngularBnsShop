import { Component } from '@angular/core';
import { Brand } from '../../models/brand.interface';
import { BrandService } from '../../services/brand.service';
import { AuthappService } from '../../services/authapp.service';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Categoria } from '../../models/categoria.interface';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrl: './add-model.component.css'
})

export class AddModelComponent {

  private _brands : Brand[]=[]; 
  private _categorie : Categoria[]=[];

  constructor(private brandService: BrandService,private categoriaService : CategoriaService,private auth : AuthappService) {}

    ngOnInit(): void{

      this.brandService.getBrands().subscribe({
        next:(data: ServerResponse)=>{
          this._brands=<Brand[]>data.message;
        },
        error:(error:HttpErrorResponse)=>{
          if(error.status===401 || error.status===403){
            this.auth.doLogout();
          }else{
            //In questo punto ricordarsi di gestire l'errore
            console.error(error);
          }
        }
      });
  
      this.categoriaService.getCategorie().subscribe({
        next:(data: ServerResponse)=>{
          this._brands=<Brand[]>data.message;
        },
        error:(error:HttpErrorResponse)=>{
          if(error.status===401 || error.status===403){
            this.auth.doLogout();
          }else{
            //In questo punto ricordarsi di gestire l'errore
            console.error(error);
          }
        }
      });
    }

    
  // Modello di dati per il form
  shoe = {
    category: '',
    brand: '',
    name: '',
    description: ''
  };

  // Funzione per gestire il submit del form
  onSubmit(form: any) {
    if (form.valid) {
      // Invia i dati al server o esegui altre azioni qui
    }
  }

  // Funzione per aggiungere una nuova categoria (placeholder)
  addCategory(): void{

  }

  // Funzione per aggiungere un nuovo brand (placeholder)
  addBrand() : void {

  }

  public get brands(): Brand[]{
    return this._brands;
  }

  public get categorie(): Categoria[]{
    return this._categorie;
  }

}
