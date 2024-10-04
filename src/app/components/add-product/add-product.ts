import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup; // Aggiungi il modificatore "!" per l'inizializzazione
  submitted = false;
  imageFiles: File[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      images: [null, Validators.required],
      modelName: ['', Validators.required],
      modelDescription: [''],
      brandName: ['', Validators.required],
      brandDescription: [''],
      category: ['', Validators.required],
      color: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      publishStatus: [false],
      sizes: this.fb.array([
        this.fb.group({
          size: ['', Validators.required],
          quantity: [0, [Validators.required, Validators.min(0)]]
        })
      ])
    });
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

  addSize(): void {
    this.sizes.push(this.fb.group({
      size: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeSize(index: number): void {
    if (this.sizes.length > 1) {
      this.sizes.removeAt(index);
    }
  }

  onImageChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.imageFiles = Array.from(event.target.files);
      this.productForm.patchValue({
        images: this.imageFiles
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    const formData = new FormData();
    this.imageFiles.forEach((file) => {
      formData.append('images', file, file.name);
    });
    formData.append('modelName', this.productForm.get('modelName')?.value);
    formData.append('modelDescription', this.productForm.get('modelDescription')?.value);
    formData.append('brandName', this.productForm.get('brandName')?.value);
    formData.append('brandDescription', this.productForm.get('brandDescription')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('color', this.productForm.get('color')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('publishStatus', this.productForm.get('publishStatus')?.value);

    const sizes = this.productForm.get('sizes')?.value;
    formData.append('sizes', JSON.stringify(sizes));

    this.http.post('https://tuo-backend-api.com/products', formData)
      .subscribe(response => {
        console.log('Prodotto aggiunto con successo', response);
        this.productForm.reset();
        this.sizes.clear();
        this.addSize(); // Mantiene almeno una taglia
        this.imageFiles = [];
        this.submitted = false;
      }, error => {
        console.error('Errore durante l\'inserimento del prodotto', error);
      });
  }
}
