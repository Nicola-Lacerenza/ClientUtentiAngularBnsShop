import { Component } from '@angular/core';
import { Brand } from '../../models/brand.interface';
import { BrandService } from '../../services/brand.service';
import { AuthappService } from '../../services/authapp.service';
import { PopUpManagerService } from '../../services/pop-up-manager.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrl: './add-model.component.css'
})

export class AddModelComponent {
  // Inizializzazione delle categorie e dei brand
  categories: string[] = ['Sneakers', 'Stivali', 'Sandali'];
  brands: string[] = ['Nike', 'Adidas', 'Puma'];


  constructor(private brandService: BrandService,private auth : AuthappService,private popUp : PopUpManagerService) {}

    ngOnInit(): void{}
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
      console.log('Modello di scarpe salvato:', this.shoe);
      // Invia i dati al server o esegui altre azioni qui
    }
  }

  // Funzione per aggiungere una nuova categoria (placeholder)
  addCategory() {
    const newCategory = prompt('Inserisci una nuova categoria');
    if (newCategory) {
      this.categories.push(newCategory);
    }
  }

  // Funzione per aggiungere un nuovo brand (placeholder)
  addBrand() {
    const newBrand = prompt('Inserisci un nuovo brand');
    if (newBrand) {
      this.brands.push(newBrand);
    }
  }
}
