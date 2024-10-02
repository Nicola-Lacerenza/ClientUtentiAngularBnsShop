import { Component, OnInit } from '@angular/core';
import { IArticoli } from '../../models/Articoli';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {
  articoli: IArticoli[] = [];
  articoliFiltrati: IArticoli[] = []; // Questo array dovrebbe contenere gli articoli filtrati
  tutteLeCategorie: string[] = ["Elettronica", "Abbigliamento", "Casa", "Giardino"];

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.articoli = [
      {
        codart: '001',
        descrizione: 'Smartphone XYZ',
        um: 'pz',
        pzcart: 1,
        peso: 0.5,
        prezzo: 299.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Smartphone+XYZ',
        imageUrls: [
          'https://via.placeholder.com/50x50.png?text=XYZ+1',
          'https://via.placeholder.com/50x50.png?text=XYZ+2',
          'https://via.placeholder.com/50x50.png?text=XYZ+3'
        ]
      },
      {
        codart: '002',
        descrizione: 'Laptop ABC',
        um: 'pz',
        pzcart: 1,
        peso: 2.0,
        prezzo: 799.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Laptop+ABC',
        imageUrls: [
          'https://via.placeholder.com/50x50.png?text=ABC+1',
          'https://via.placeholder.com/50x50.png?text=ABC+2',
          'https://via.placeholder.com/50x50.png?text=ABC+3'
        ]
      },
      {
        codart: '003',
        descrizione: 'Cuffie Wireless',
        um: 'pz',
        pzcart: 1,
        peso: 0.3,
        prezzo: 79.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Cuffie+Wireless',
        imageUrls: [
          'https://via.placeholder.com/50x50.png?text=Cuffie+1',
          'https://via.placeholder.com/50x50.png?text=Cuffie+2',
          'https://via.placeholder.com/50x50.png?text=Cuffie+3'
        ]
      },
      {
        codart: '004',
        descrizione: 'Monitor 27" 4K',
        um: 'pz',
        pzcart: 1,
        peso: 4.5,
        prezzo: 499.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Monitor+27%22',
        imageUrls: [
          'https://via.placeholder.com/50x50.png?text=Monitor+1',
          'https://via.placeholder.com/50x50.png?text=Monitor+2',
          'https://via.placeholder.com/50x50.png?text=Monitor+3'
        ]
      },
      {
        codart: '005',
        descrizione: 'Stampante Laser',
        um: 'pz',
        pzcart: 1,
        peso: 8.0,
        prezzo: 199.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Stampante+Laser',
        imageUrls: [
          'https://via.placeholder.com/50x50.png?text=Stampante+1',
          'https://via.placeholder.com/50x50.png?text=Stampante+2',
          'https://via.placeholder.com/50x50.png?text=Stampante+3'
        ]
      },
      {
        codart: '006',
        descrizione: 'Mouse Ergonomico',
        um: 'pz',
        pzcart: 1,
        peso: 0.15,
        prezzo: 39.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Mouse+Ergonomico',
        imageUrls: [
          'https://via.placeholder.com/50x50.png?text=Mouse+1',
          'https://via.placeholder.com/50x50.png?text=Mouse+2',
          'https://via.placeholder.com/50x50.png?text=Mouse+3'
        ]
      },
      // Aggiunta di altri 3 prodotti
      {
        codart: '007',
        descrizione: 'Smartwatch 4.0',
        um: 'pz',
        pzcart: 1,
        peso: 0.25,
        prezzo: 149.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Smartwatch+4.0',
        imageUrls: [
          'https://via.placeholder.com/50x50.png?text=Smartwatch+1',
          'https://via.placeholder.com/50x50.png?text=Smartwatch+2',
          'https://via.placeholder.com/50x50.png?text=Smartwatch+3'
        ]
      },
      {
        codart: '008',
        descrizione: 'Tablet 10" HD',
        um: 'pz',
        pzcart: 1,
        peso: 0.7,
        prezzo: 249.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Tablet+10%22',
        imageUrls: [
          'https://via.placeholder.com/50x50.png?text=Tablet+1',
          'https://via.placeholder.com/50x50.png?text=Tablet+2',
          'https://via.placeholder.com/50x50.png?text=Tablet+3'
        ]
      },
      {
        codart: '009',
        descrizione: 'Altoparlante Bluetooth',
        um: 'pz',
        pzcart: 1,
        peso: 0.5,
        prezzo: 99.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Altoparlante+Bluetooth',
        imageUrls: [
          'https://via.placeholder.com/50x50.png?text=Altoparlante+1',
          'https://via.placeholder.com/50x50.png?text=Altoparlante+2',
          'https://via.placeholder.com/50x50.png?text=Altoparlante+3'
        ]
      }
    ];

    // Inizializza gli articoli filtrati con tutti gli articoli
    this.articoliFiltrati = this.articoli;
  }

  cambiaImmagine(img: string, articolo: IArticoli): void {
    articolo.imageUrl = img;
  }

  applicaFiltri(categoria: string): void {
    // Implementazione della logica dei filtri
    console.log(`Filtro applicato: ${categoria}`);
  }
}
