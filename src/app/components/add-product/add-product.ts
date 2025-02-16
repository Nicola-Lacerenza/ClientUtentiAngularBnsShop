import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { AuthappService } from '../../services/authapp.service';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { Modello } from '../../models/modello.interface';
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
  taglie: { taglia: number, quantita: number }[] = [];
  private _brands: Brand[] = [];
  private _categorie: Categoria[] = [];
  successMessage: string | null = null;  // Variabile per il messaggio di successo

  selectedBrandAction: string | null = null;
  selectedCategoriaAction: string | null = null;
  
  private _actualBrandSelected: number | undefined;
  private _actualCategoriaSelected: number | undefined;

  // Lista dei colori primari in formato esadecimale
  primaryColors: string[] = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', 'FFFFFF'];
  
  // Mappatura tra il valore esadecimale e il nome del colore
  colorNames: { [key: string]: string } = {
    '#FF0000': 'ROSSO',
    '#00FF00': 'VERDE',
    '#0000FF': 'BLU',
    '#FFFF00': 'GIALLO',
    '#FF00FF': 'MAGENTA',
    '#00FFFF': 'CYAN',
    'FFFFFF': 'BIANCO'
  };

  // Memorizza i colori selezionati (in formato esadecimale)
  selectedColorsHex: string[] = [];

  @ViewChild("brandSelect") brandSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild("categoriaSelect") categoriaSelect!: ElementRef<HTMLSelectElement>;

  private actualId: number | undefined;
  public actualProductSelected: ProdottiFull = { 
    id: 0,
    nome_modello: "",
    descrizione_modello: "",
    nome_categoria: "",
    nome_brand: "",
    descrizione_brand: "", 
    stato_pubblicazione: -1,
    prezzo: -1,
    taglia_Eu: [],
    taglia_Uk: [],
    taglia_Us: [],
    quantita: [],
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
    // Mostra l'URL per debug
    this.route.url.subscribe(url => console.log(url.toString()));

    // Leggi il parametro "id" dalla rotta
    const tmp = this.route.snapshot.paramMap.get("id");

    // Se "id" esiste, chiama il servizio per ottenere il prodotto
    if (tmp !== null) {
      this.actualId = parseInt(tmp);
      console.log("ID selezionato:", this.actualId);
      this.prodottiService.getProdotto(this.actualId).subscribe({
        next: (data: ServerResponse) => {
          console.log(data);
          const tmp = <ProdottiFull[]>data.message;
          this.actualProductSelected = tmp[0];
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
      this.taglie.push({ taglia: size, quantita: 0 });
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
        // Resetta la selezione del brand
        this.shoe.brand = '';
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
        // Resetta la selezione della categoria
        this.shoe.category = '';
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

  removeMainImage(): void {
    if (this.imageFiles.length > 1) {
      this.imageFiles.splice(0, 1); // Rimuove l'immagine principale
      this.imagePreviews.splice(0, 1); // Rimuove il relativo preview
      this.mainImagePreview = this.imagePreviews[0]; // Imposta una nuova immagine principale
    } else {
      this.imageFiles = [];
      this.imagePreviews = [];
      this.mainImagePreview = '';
    }
    this.productForm.patchValue({ images: this.imageFiles }); // Aggiorna il modulo
  }

  // Incrementa la quantità per la taglia selezionata 
  increaseQuantity(t: number): void {
    let index: number = 0;
    while (index < this.taglie.length && this.taglie[index].taglia !== t) {
      index++;
    }
    if (index >= this.taglie.length) {
      return;
    }
    this.taglie[index].quantita++;
  }

  // Decrementa la quantità per la taglia selezionata 
  decreaseQuantity(t: number): void {
    let index: number = 0;
    while (index < this.taglie.length && this.taglie[index].taglia !== t) {
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

  // Funzione per l'inserimento del prodotto nel DB
  public insertProduct(form: NgForm) {
    if (form.valid) {
      form.reset();
      this.popUp.closeForm();
    }
  }

  public inserimentoProdotti(form: NgForm) {
    console.log(form.value);
  
    // Controlla se il form è valido prima di procedere
    if (form.valid) {
      // Mappa i colori selezionati in nomi
      form.value.colore = this.selectedColorsHex.map(color => this.colorNames[color]).join(', ');
      
      // Crea un nuovo FormData
      const formData = new FormData();
  
      // Aggiungi le immagini
      for (let j = 0; j < this.imageFiles.length; j++) {
        formData.append("image" + j, this.imageFiles[j], this.imageFiles[j].name);
      }
  
      // Aggiungi i dati generali del form
      formData.append("id_categoria", form.value.id_categoria);
      formData.append("id_brand", form.value.id_brand);
      formData.append("nome", form.value.nome);
      formData.append("descrizione", form.value.descrizione);
      formData.append("prezzo", form.value.prezzo);
      formData.append("stato_pubblicazione", form.value.stato_pubblicazione);
      formData.append("colori", form.value.colore);
      
      const taglie1: { quantita: number, taglia: number }[] = [];
  
      // Aggiungi tutte le taglie e quantità per il prodotto
      this.taglie.forEach(size => {
        if (size.quantita > 0) {
          taglie1.push({ quantita: size.quantita, taglia: size.taglia });
        }
      });
      formData.append("taglie", JSON.stringify(taglie1));
      
      // Esegui l'inserimento del prodotto
      this.prodottiService.insertProdotti(formData).subscribe({
        next: (data: ServerResponse) => {
          // Mostra il messaggio di successo
          this.successMessage = "Prodotto inserito con successo!";
          // Dopo 2 secondi torna indietro
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
    }
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
}
