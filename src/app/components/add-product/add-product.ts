import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { AuthappService } from '../../services/authapp.service';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { Modello } from '../../models/modello.interface';
import { ModelloService } from '../../services/modello.service';
import { AddModelComponent } from '../add-model/add-model.component';
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
  taglie : {taglia:number,quantita:number}[]=[];
  

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
      this.taglie.push({taglia:size,quantita:0})
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

  // Incrementa la quantità per la taglia selezionata 
  increaseQuantity(t: number): void {
    let index:number = 0;
    while(index<this.taglie.length && this.taglie[index].taglia !== t){
      index++;
    }
    if(index>=this.taglie.length){
      return;
    }
    this.taglie[index].quantita++;
  }

  decreaseQuantity(t: number): void {
    let index:number = 0;
    while(index<this.taglie.length && this.taglie[index].taglia !== t){
      index--;
    }
    if(index>=this.taglie.length){
      return;
    }
    if(this.taglie[index].quantita-1>=0){
      this.taglie[index].quantita--;
    }
  }

  onSubmit(): void {
    this.submitted = true; // Imposta il flag di submit
    if (this.productForm.invalid) {
      return; // Se il modulo è invalido, non eseguire ulteriori operazioni
    }
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
