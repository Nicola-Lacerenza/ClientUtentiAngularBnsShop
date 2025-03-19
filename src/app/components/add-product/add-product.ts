import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { AuthappService } from '../../services/authapp.service';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { ProdottiService } from '../../services/prodotti.service';
import { AddCategoriaComponent } from '../add-categoria/add-categoria.component';
import { Brand } from '../../models/brand.interface';
import { Categoria } from '../../models/categoria.interface';
import { AddBrandComponent } from '../add-brand/add-brand.component';
import { BrandService } from '../../services/brand.service';
import { CategoriaService } from '../../services/categoria.service';
import { UpdateBrandComponent } from '../update-brand/update-brand.component';
import { UpdateCategoriaComponent } from '../update-categoria/update-categoria.component';
import { ActivatedRoute } from '@angular/router';
import { ProdottiFull } from '../../models/prodottiFull.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  submitted = false;
  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  mainImagePreview: string = '';
  taglie: { taglia: string, quantita: number }[] = [];
  private _brands: Brand[] = [];
  private _categorie: Categoria[] = [];
  successMessage: string | null = null;  // Variabile per il messaggio di successo

  selectedBrandAction: string | null = null;
  selectedCategoriaAction: string | null = null;
  
  private _actualBrandSelected: number | undefined;
  private _actualCategoriaSelected: number | undefined;

// Lista dei colori primari e secondari in formato esadecimale
primaryColors: string[] = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#99FFFF', 
  'FFFFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080',
  '#000000' 
];

// Mappatura tra il valore esadecimale e il nome del colore
colorNames: { [key: string]: string } = {
  '#FF0000': 'ROSSO','#00FF00': 'VERDE','#0000FF': 'BLU','#FFFF00': 'GIALLO','#FF00FF': 'MAGENTA',
  '#99FFFF': 'CELESTE','FFFFFF': 'BIANCO','#FFA500': 'ARANCIONE','#800080': 'VIOLA','#FFC0CB': 'ROSA',
  '#A52A2A': 'MARRONE','#808080': 'GRIGIO', '#000000': 'NERO' 
};

colorCode:{[key: string]: string} = {
  'ROSSO': '#FF0000', 'VERDE': '#00FF00','BLU': '#0000FF','GIALLO': '#FFFF00','MAGENTA': '#FF00FF',
  'CELESTE': '#99FFFF','BIANCO': 'FFFFFF','ARANCIONE': '#FFA500','VIOLA': '#800080','ROSA': '#FFC0CB',
  'MARRONE': '#A52A2A','GRIGIO': '#808080', 'NERO': '#000000' 
};

  colorNameSelected:string[] | undefined;

  // Memorizza i colori selezionati (in formato esadecimale)
  selectedColorsHex: string[] = [];

  @ViewChild("brandSelect") brandSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild("categoriaSelect") categoriaSelect!: ElementRef<HTMLSelectElement>;

  public urlListProductToUpdate: string[] | undefined ;
  private actualId: number | undefined;
  public actualProductSelected: ProdottiFull = { 
    id: 0,
    id_modello:0,
    nome_modello: "",
    descrizione_modello: "",
    id_categoria: 0,
    nome_categoria: "",
    target: "",
    id_brand: 0,
    nome_brand: "",
    descrizione_brand: "", 
    stato_pubblicazione: 0,
    prezzo: 0,
    taglieProdotto: [],
    url: [],
    nome_colore: []
  };  

  constructor(
    private fb: FormBuilder, 
    private prodottiService: ProdottiService, 
    private auth: AuthappService,
    private brandService: BrandService,
    private categoriaService: CategoriaService,
    private popUp: PopUpManagerService,
    private route: ActivatedRoute
  ) {}

  public get actualBrandSelected(): number | undefined {
    return this._actualBrandSelected;
  }

  public get actualCategoriaSelected(): number | undefined {
    return this._actualCategoriaSelected;
  }

  public updateidSelected(): void {
    const brandSelectValue: number = parseInt(this.brandSelect.nativeElement.value);
    this._actualBrandSelected = brandSelectValue;
  }

  public updateidSelected1(): void {
    const categoriaSelectValue: number = parseInt(this.categoriaSelect.nativeElement.value);
    this._actualCategoriaSelected = categoriaSelectValue;
  }

  ngOnInit(): void {
    // Leggi il parametro "id" dalla rotta
    const tmp = this.route.snapshot.paramMap.get("id");

    // Se "id" esiste, chiama il servizio per ottenere il prodotto
    if (tmp !== null) {
      this.actualId = parseInt(tmp);
      this.prodottiService.getProdotto(this.actualId).subscribe({
        next: (data: ServerResponse) => {
          const tmp = <ProdottiFull>data.message;
          console.log("Prodotto selezionato:",tmp);
          this.actualProductSelected = tmp;
          this.urlListProductToUpdate = tmp.url;
          this.imagePreviews = tmp.url.map(url => this.createUrlByString(url));
          this.colorNameSelected=tmp.nome_colore;
          for(const color of tmp.nome_colore){
            this.selectColor(this.extractColorHex(color));
          }
          for(const taglia of tmp.taglieProdotto){
            let i=0;
            while(i<this.taglie.length && this.taglie[i].taglia !== taglia.taglia.taglia_Eu){
              i++;
            }
            this.taglie[i].quantita+=taglia.taglia_prodotti.quantita;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.urlListProductToUpdate = undefined;
          this.colorNameSelected = undefined;
          if (error.status === 401 || error.status === 403) {
            this.auth.doLogout();
          } else {
            console.error(error);
          }
        }
      });
    }else{
      this.urlListProductToUpdate = undefined;
      this.colorNameSelected = undefined;
    }

    // Chiamate per ottenere brands e categorie
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

    // Inizializza le taglie disponibili
    for (let size = 35.5; size <= 46; size += 0.5) {
      this.taglie.push({ taglia: "" + size, quantita: 0 });
    }

    // Inizializza il modulo
    this.productForm = this.fb.group({
      images: [null, Validators.required],
      model: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      publishStatus: [false],
      sizes: this.fb.array([]) // Rimuove il precedente FormArray
    });
  }


  public get brands(): Brand[] {
    return this._brands;
  }
  
  public get categorie(): Categoria[] {
    return this._categorie;
  }
  
  onImageChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.imageFiles = Array.from(event.target.files);
      this.imagePreviews = this.imageFiles.map((file) => URL.createObjectURL(file));
      this.mainImagePreview = this.imagePreviews[0]; // Imposta la prima immagine come principale
      this.productForm.patchValue({ images: this.imageFiles }); // Aggiorna il modulo con le immagini
    }
  }

  // Gestione azioni per Categoria
  public onCategoriaAction(action: string): void {
    this.selectedCategoriaAction = action;
    switch (action) {
      case 'Aggiungi':
        this.popUp.openForm(AddCategoriaComponent, undefined);
        break;
      case 'Modifica':
        this.popUp.openForm(UpdateCategoriaComponent, this._actualCategoriaSelected);
        break;
      case 'Elimina':
        this.deleteCategoria(<number>this._actualCategoriaSelected);
        break;
    }
  }

  // Gestione azioni per Brand
  public onBrandAction(action: string): void {
    this.selectedBrandAction = action;
    switch (action) {
      case 'Aggiungi':
        this.popUp.openForm(AddBrandComponent, undefined);
        break;
      case 'Modifica':
        this.popUp.openForm(UpdateBrandComponent, this._actualBrandSelected);
        break;
      case 'Elimina':
        this.deleteBrand(<number>this._actualBrandSelected);
        break;
    }
  }

  private deleteBrand(brandId: number): void {
    this.brandService.deleteBrand(brandId).subscribe({
      next: (response) => {
        console.log('Brand eliminato con successo');
        // Rimuovi il brand dalla lista locale
        this._brands = this._brands.filter(brand => brand.id !== brandId);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.auth.doLogout();
        } else {
          console.error('Errore durante l\'eliminazione del brand:', error);
        }
      }
    });
  }

  private deleteCategoria(categoriaId: number): void {
    this.categoriaService.deleteCategoria(categoriaId).subscribe({
      next: (response) => {
        console.log('Categoria eliminata con successo');
        // Rimuovi la categoria dalla lista locale
        this._categorie = this._categorie.filter(categoria => categoria.id !== categoriaId);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.auth.doLogout();
        } else {
          console.error('Errore durante l\'eliminazione della categoria:', error);
        }
      }
    });
  }

  onThumbnailHover(index: number): void {
    this.mainImagePreview = this.imagePreviews[index]; // Cambia l'immagine principale al passaggio del mouse
  }

  removeImage(): void {
    const index = this.imagePreviews.indexOf(this.mainImagePreview);
    if (index === -1) return;
  
    let isNew = true;
    if (this.urlListProductToUpdate && this.urlListProductToUpdate.length > 0) {
      const existingUrls = this.urlListProductToUpdate.map(url => this.createUrlByString(url));
      if (existingUrls.includes(this.mainImagePreview)) {
        isNew = false;
      }
    }  
    // Rimuove l'immagine dall'array delle anteprime
    this.imagePreviews.splice(index, 1);
    // Rimuove dal corrispondente array
    if (isNew) {
      this.imageFiles.splice(index, 1);
    } else {
      this.urlListProductToUpdate!.splice(index, 1);
    }  
    // Aggiorna il form (solo per le nuove immagini)
    this.productForm.patchValue({ images: this.imageFiles });  
    // Imposta la nuova immagine principale (se presente) oppure azzera
    this.mainImagePreview = this.imagePreviews.length > 0 ? this.imagePreviews[0] : '';
  }
    
  // Incrementa la quantità per la taglia selezionata 
  increaseQuantity(t: string): void {
    let index: number = 0;
    while (index < this.taglie.length && this.taglie[index].taglia !== ""+t) {
      index++;
    }
    if (index >= this.taglie.length) {
      return;
    }
    this.taglie[index].quantita++;
  }

  // Decrementa la quantità per la taglia selezionata 
  decreaseQuantity(t: string): void {
    let index: number = 0;
    while (index < this.taglie.length && this.taglie[index].taglia !== ""+t) {
      index++;
    }
    if (index >= this.taglie.length) {
      return;
    }
    if (this.taglie[index].quantita - 1 >= 0) {
      this.taglie[index].quantita--;
    }
  }

  onSubmit(): void {
    this.submitted = true; // Imposta il flag di submit
    if (this.productForm.invalid) {
      return; // Se il modulo è invalido, esci dalla funzione
    }
  }

  public actionProdotti(form: NgForm) {
    if (form.valid) {
      // Mappa i colori selezionati in nomi
      form.value.colore = this.selectedColorsHex
        .map(color => this.colorNames[color])
        .join(', ');
  
      // Crea un nuovo FormData
      const formData = new FormData();
  
      // Aggiungi le immagini, se presenti
      if (this.imageFiles && this.imageFiles.length > 0) {
        for (let j = 0; j < this.imageFiles.length; j++) {
          formData.append("image" + j, this.imageFiles[j], this.imageFiles[j].name);
        }
      }

      // Invia le URL delle immagini esistenti (se presenti)
      if (this.urlListProductToUpdate && this.urlListProductToUpdate.length > 0) {
          formData.append("", JSON.stringify(this.urlListProductToUpdate));
      }
  
      // Aggiungi i dati generali del form
      formData.append("id_categoria", form.value.id_categoria);
      formData.append("id_brand", form.value.id_brand);
      formData.append("nome", form.value.nome);
      formData.append("descrizione", form.value.descrizione);
      formData.append("prezzo", form.value.prezzo);
      formData.append("stato_pubblicazione", form.value.stato_pubblicazione);
      formData.append("colori", form.value.colore);
  
      // Crea l'array delle taglie con relative quantità
      const taglie1: { quantita: number, taglia: string }[] = [];
      this.taglie.forEach(size => {
        if (size.quantita > 0) {
          taglie1.push({ quantita: size.quantita, taglia: size.taglia });
        }
      });
      formData.append("taglie", JSON.stringify(taglie1));
  
      // Se l'id del prodotto è <= 0 si tratta di un'inserimento, altrimenti di un aggiornamento
      if (this.actualProductSelected.id <= 0) {
        this.prodottiService.insertProdotti(formData).subscribe({
          next: (data: ServerResponse) => {
            this.successMessage = "Prodotto inserito con successo!";
            setTimeout(() => {
              this.successMessage = null;
              window.history.back();
            }, 2000);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 401 || error.status === 403) {
              this.successMessage = "Errore durante l'inserimento del prodotto.";
              console.error(error);
              setTimeout(() => {
                this.successMessage = null;
              }, 3000);
            } else {
              this.successMessage = "Compila correttamente tutti i campi obbligatori.";
              setTimeout(() => {
                this.successMessage = null;
              }, 3000);
            }
          }
        });
      } else {
        
        formData.append("id", this.actualProductSelected.id.toString());
        formData.forEach((value, key) => {
          console.log(key, value);
        });
        
        this.prodottiService.updateProdotti(this.actualProductSelected.id, formData).subscribe({
          next: (data: ServerResponse) => {           
            this.successMessage = "Prodotto modificato con successo!";
            setTimeout(() => {
              this.successMessage = null;
              window.history.back();
            }, 2000);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 401 || error.status === 403) {
              this.successMessage = "Errore durante la modifica del prodotto.";
              console.error(error);
              setTimeout(() => {
                this.successMessage = null;
              }, 3000);
            } else {
              this.successMessage = "Compila correttamente tutti i campi obbligatori.";
              setTimeout(() => {
                this.successMessage = null;
              }, 3000);
            }
          }
        });
      }
    }
  }
  
  public createUrlByString(filename: string): string {
    return `${environment.serverUrl}/${filename}`;
  }

  // Gestione della selezione colore
  public selectColor(colorHex: string): void {
    const index = this.selectedColorsHex.indexOf(colorHex);
    if (index === -1) {
      // Aggiungi il colore se non è già presente
      this.selectedColorsHex.push(colorHex);
    } else {
      // Rimuovi il colore se è già presente
      this.selectedColorsHex.splice(index, 1);
    }
  }

  public extractColorHex(colorName: string): string {
    return this.colorCode[colorName];
  }
  
}

