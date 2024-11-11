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

  // Lista dei colori primari in formato esadecimale
  primaryColors: string[] = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  
  // Mappatura tra il valore esadecimale e il nome del colore
  colorNames: { [key: string]: string } = {
    '#FF0000': 'ROSSO',
    '#00FF00': 'VERDE',
    '#0000FF': 'BLU',
    '#FFFF00': 'GIALLO',
    '#FF00FF': 'MAGENTA',
    '#00FFFF': 'CYAN'
  };

  // Memorizza il colore selezionato (in formato esadecimale)
  selectedColorHex: string | null = null;

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
    description: '',
    colore: ''  // Il colore sarà inviato come stringa (es. "ROSSO")
  };

  public get brands(): Brand[] {
    return this._brands;
  }

  public get categorie(): Categoria[] {
    return this._categorie;
  }

  public insertModello(form: NgForm) {
    if (form.valid) {
      // Se il colore è stato selezionato, mappiamo l'esadecimale al nome del colore
      form.value.colore = this.selectedColorHex ? this.colorNames[this.selectedColorHex] : '';
      
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
        break;
      case 'Elimina':
        console.log('Elimina Categoria');
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
        break;
      case 'Elimina':
        console.log('Elimina Brand');
        break;
    }
  }

  // Gestione selezione colore
  public selectColor(colorHex: string): void {
    // Se il colore è già selezionato, deselezioniamo
    if (this.selectedColorHex === colorHex) {
      this.selectedColorHex = null;
    } else {
      this.selectedColorHex = colorHex; // Memorizziamo il colore esadecimale selezionato
    }
  }

}
