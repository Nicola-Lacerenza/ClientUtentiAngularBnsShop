import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Brand } from '../../models/brand.interface';
import { BrandService } from './../../services/brand.service';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { AuthappService } from '../../services/authapp.service';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { Modello } from '../../models/modello.interface';
import { ModelloService } from '../../services/modello.service';
import { AddModelComponent } from '../add-model/add-model.component';
import { ServerRequest } from './../../models/ServerRequest.interface';
import { ProdottiService } from '../../services/prodotti.service';

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
  availableSizes: number[] = [];
  selectedSize: number | null = null;
  quantities: number[] = [];
  

  private _models : Modello[]=[];

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private prodottiService: ProdottiService, 
    private modelService : ModelloService,
    private auth : AuthappService,
    private popUp : PopUpManagerService
  ) {}

  ngOnInit(): void {

    this.modelService.getModelli().subscribe({
      next:(data: ServerResponse)=>{
        this._models=<Modello[]>data.message;
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

  
    // Inizializza le taglie disponibili
    for (let size = 35.5; size <= 46; size += 0.5) {
      this.availableSizes.push(Math.round(size * 10) / 10);
      this.quantities.push(0);
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

  onImageChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.imageFiles = Array.from(event.target.files);
      this.imagePreviews = this.imageFiles.map((file) => URL.createObjectURL(file));
      this.mainImagePreview = this.imagePreviews[0]; // Imposta la prima immagine come principale
      this.productForm.patchValue({ images: this.imageFiles }); // Aggiorna il modulo con le immagini
    }
  }

  onThumbnailHover(index: number): void {
    this.mainImagePreview = this.imagePreviews[index]; // Cambia l'immagine principale al passaggio del mouse
  }

  removeMainImage(): void {
    if (this.imageFiles.length > 1) {
      this.imageFiles.splice(0, 1); // Rimuove l'immagine principale
      this.imagePreviews.splice(0, 1); // Rimuove il preview dell'immagine principale
      this.mainImagePreview = this.imagePreviews[0]; // Imposta una nuova immagine principale
    } else {
      this.imageFiles = []; // Rimuove tutte le immagini se c'è solo una
      this.imagePreviews = [];
      this.mainImagePreview = '';
    }
    this.productForm.patchValue({ images: this.imageFiles }); // Aggiorna il modulo
  }

  increaseQuantity(index: number): void {
    this.quantities[index] += 1; // Incrementa la quantità per la taglia selezionata
  }

  decreaseQuantity(index: number): void {
    if (this.quantities[index] > 0) {
      this.quantities[index] -= 1; // Decrementa la quantità per la taglia selezionata
    }
  }

  onSubmit(): void {
    this.submitted = true; // Imposta il flag di submit
    if (this.productForm.invalid) {
      return; // Se il modulo è invalido, non eseguire ulteriori operazioni
    }

    // Logica per l'invio del modulo e delle immagini al server
    const formData = new FormData();
    this.imageFiles.forEach((file) => {
      formData.append('images', file); // Aggiungi ciascuna immagine a formData
    });
    formData.append('model', this.productForm.get('model')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('publishStatus', this.productForm.get('publishStatus')?.value);
    this.quantities.forEach((quantity, index) => {
      formData.append(`quantities[${index}]`, quantity.toString()); // Aggiungi ciascuna quantità a formData
    });

    // Invia i dati al server (implementa il tuo endpoint)
    this.http.post('/api/products', formData).subscribe(response => {
      console.log('Prodotto inserito con successo:', response);
      // Aggiungi logica per il messaggio di successo o reindirizzamento
    }, error => {
      console.error('Errore nell\'inserimento del prodotto:', error);
      // Aggiungi logica per gestire l'errore
    });
  }



  public get models(): Modello[]{
    return this._models;
  }

  // Funzione che apre il dialog con AddModelComponent
  public addModel(): void {
    this.popUp.openForm(AddModelComponent); 
  }

  // Funzione inserimento prodotto nel DB
  public insertProduct(form:NgForm){
    
    if(form.valid){
      form.reset();
      this.popUp.closeForm();
    }
  }
  public inserimentoProdotti(form: NgForm) {
    console.log(form.value);
    if (form.valid) {
      this.prodottiService.insertProdotti(form.value).subscribe({
        next: (data: ServerResponse) => {
          form.reset();
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
}
