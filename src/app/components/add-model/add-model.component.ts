import { Component } from '@angular/core';
import { Brand } from '../../models/brand.interface';
import { BrandService } from '../../services/brand.service';
import { AuthappService } from '../../services/authapp.service';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { Categoria } from '../../models/categoria.interface';
import { CategoriaService } from '../../services/categoria.service';
import { NgForm } from '@angular/forms';
import { ModelloService } from '../../services/modello.service';
import { AddBrandComponent } from '../add-brand/add-brand.component';
import { AddCategoriaComponent } from '../add-categoria/add-categoria.component';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})

export class AddModelComponent {

  private _brands: Brand[] = [];
  private _categorie: Categoria[] = [];
  
  selectedBrandAction: string | null = null;
  selectedCategoriaAction: string | null = null;

  constructor(
    private popUp: PopUpManagerService,
    private modelloService: ModelloService,
    private brandService: BrandService,
    private categoriaService: CategoriaService,
    private auth: AuthappService
  ) {}

  ngOnInit(): void {
    this.brandService.getBrands().subscribe({
      next: (data: ServerResponse) => {
        this._brands = <Brand[]>data.message;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.auth.doLogout();
        } else {
          console.error(error);
        }
      }
    });

    this.categoriaService.getCategorie().subscribe({
      next: (data: ServerResponse) => {
        this._categorie = <Categoria[]>data.message;
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

  // Modello di dati per il form
  shoe = {
    category: '',
    brand: '',
    name: '',
    description: ''
  };

  public get brands(): Brand[] {
    return this._brands;
  }

  public get categorie(): Categoria[] {
    return this._categorie;
  }

  public insertModello(form: NgForm) {
    if (form.valid) {
      this.modelloService.insertModello(form.value).subscribe({
        next: (data: ServerResponse) => {
          form.reset();
          this.popUp.closeForm();
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
  }
   

  // Gestione azioni per Categoria
  public onCategoriaAction(action: string): void {
    this.selectedCategoriaAction = action;
    switch (action) {
      case 'Aggiungi':
        this.popUp.openForm(AddCategoriaComponent);
        break;
      case 'Modifica':
        console.log('Modifica Categoria');
        // Implementa logica di modifica
        break;
      case 'Elimina':
        console.log('Elimina Categoria');
        // Implementa logica di eliminazione
        break;
    }
  }

  // Gestione azioni per Brand
  public onBrandAction(action: string): void {
    this.selectedBrandAction = action;
    switch (action) {
      case 'Aggiungi':
        this.popUp.openForm(AddBrandComponent);
        break;
      case 'Modifica':
        console.log('Modifica Brand');
        // Implementa logica di modifica
        break;
      case 'Elimina':
        
        console.log('Elimina Brand');
        // Implementa logica di eliminazione
        break;
    }
  }
}
