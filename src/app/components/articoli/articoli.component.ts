import { Component, OnInit } from '@angular/core';
import { IArticoli } from '../../models/Articoli';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {
  articoli: IArticoli[] = [];
  articoliFiltrati: IArticoli[] = []; // Array contenente gli articoli filtrati
  tutteLeCategorie: string[] = ["Elettronica", "Abbigliamento", "Casa", "Giardino"];
  showThumbnails: { [key: string]: boolean } = {}; // Oggetto per gestire lo stato delle miniature

  constructor() {}

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
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6d0dba9a-5a9f-4b30-b9db-9022d3a29609/AIR+MAX+DN.png',
        imageUrls: [
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/23806611-1042-4020-8706-be473f72fce5/AIR+MAX+DN.png',
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6d0dba9a-5a9f-4b30-b9db-9022d3a29609/AIR+MAX+DN.png',
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6d0dba9a-5a9f-4b30-b9db-9022d3a29609/AIR+MAX+DN.png'
        ]
      },
      {
        codart: '002',
        descrizione: 'Laptop ABC',
        um: 'pz',
        pzcart: 1,
        peso: 2.0,
        prezzo: 899.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3b1c74e9-746d-4935-ac4f-e928f185502c/AIR+MAX+DN+%28GS%29.png',
        imageUrls: [
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/355df138-488d-4466-a37a-7c100385c5f5/AIR+MAX+DN+%28GS%29.png',
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3b1c74e9-746d-4935-ac4f-e928f185502c/AIR+MAX+DN+%28GS%29.png',
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/355df138-488d-4466-a37a-7c100385c5f5/AIR+MAX+DN+%28GS%29.png'
        ]
      },
      {
        codart: '003',
        descrizione: 'Cuffie Bluetooth',
        um: 'pz',
        pzcart: 1,
        peso: 0.3,
        prezzo: 149.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Cuffie+Bluetooth',
        imageUrls: [
          'https://via.placeholder.com/350x250.png?text=Cuffie+Bluetooth+1',
          'https://via.placeholder.com/350x250.png?text=Cuffie+Bluetooth+2',
          'https://via.placeholder.com/350x250.png?text=Cuffie+Bluetooth+3'
        ]
      },
      {
        codart: '004',
        descrizione: 'Smartwatch GHI',
        um: 'pz',
        pzcart: 1,
        peso: 0.2,
        prezzo: 199.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Smartwatch+GHI',
        imageUrls: [
          'https://via.placeholder.com/350x250.png?text=Smartwatch+GHI+1',
          'https://via.placeholder.com/350x250.png?text=Smartwatch+GHI+2',
          'https://via.placeholder.com/350x250.png?text=Smartwatch+GHI+3'
        ]
      },
      {
        codart: '005',
        descrizione: 'Tablet JKL',
        um: 'pz',
        pzcart: 1,
        peso: 0.6,
        prezzo: 349.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Tablet+JKL',
        imageUrls: [
          'https://via.placeholder.com/350x250.png?text=Tablet+JKL+1',
          'https://via.placeholder.com/350x250.png?text=Tablet+JKL+2',
          'https://via.placeholder.com/350x250.png?text=Tablet+JKL+3'
        ]
      },
      {
        codart: '006',
        descrizione: 'Action Camera MNO',
        um: 'pz',
        pzcart: 1,
        peso: 0.5,
        prezzo: 249.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Action+Camera+MNO',
        imageUrls: [
          'https://via.placeholder.com/350x250.png?text=Action+Camera+MNO+1',
          'https://via.placeholder.com/350x250.png?text=Action+Camera+MNO+2',
          'https://via.placeholder.com/350x250.png?text=Action+Camera+MNO+3'
        ]
      },
      {
        codart: '007',
        descrizione: 'Echo Dot PQR',
        um: 'pz',
        pzcart: 1,
        peso: 0.3,
        prezzo: 49.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Echo+Dot+PQR',
        imageUrls: [
          'https://via.placeholder.com/350x250.png?text=Echo+Dot+PQR+1',
          'https://via.placeholder.com/350x250.png?text=Echo+Dot+PQR+2',
          'https://via.placeholder.com/350x250.png?text=Echo+Dot+PQR+3'
        ]
      },
      {
        codart: '008',
        descrizione: 'Fitbit STU',
        um: 'pz',
        pzcart: 1,
        peso: 0.3,
        prezzo: 129.99,
        active: true,
        data: new Date(),
        imageUrl: 'https://via.placeholder.com/350x250.png?text=Fitbit+STU',
        imageUrls: [
          'https://via.placeholder.com/350x250.png?text=Fitbit+STU+1',
          'https://via.placeholder.com/350x250.png?text=Fitbit+STU+2',
          'https://via.placeholder.com/350x250.png?text=Fitbit+STU+3'
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
          'https://via.placeholder.com/350x250.png?text=Altoparlante+Bluetooth+1',
          'https://via.placeholder.com/350x250.png?text=Altoparlante+Bluetooth+2',
          'https://via.placeholder.com/350x250.png?text=Altoparlante+Bluetooth+3'
        ]
      }
    ];

    // Inizializza gli articoli filtrati con tutti gli articoli
    this.articoliFiltrati = this.articoli;

    // Inizializza lo stato delle miniature per ogni articolo
    this.articoli.forEach(articolo => {
      this.showThumbnails[articolo.codart] = false; // Inizializza a false
    });
  }

  cambiaImmagine(img: string, articolo: IArticoli): void {
    articolo.imageUrl = img; // Cambia l'immagine principale con quella in miniatura
  }

  applicaFiltri(categoria: string): void {
    // Implementazione della logica dei filtri
    console.log(`Filtro applicato: ${categoria}`);
    // Esempio di filtraggio
    if (categoria) {
      this.articoliFiltrati = this.articoli.filter(a => a.descrizione.includes(categoria));
    } else {
      this.articoliFiltrati = this.articoli;
    }
  }

  // Funzione per mostrare le miniature quando il cursore è sopra la descrizione
  toggleThumbnails(codart: string, isHovered: boolean): void {
    this.showThumbnails[codart] = isHovered; // Imposta true o false
  }
}
