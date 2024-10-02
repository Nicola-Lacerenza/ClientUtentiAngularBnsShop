import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { IArticoli } from '../../models/Articoli';

@Component({
  selector: 'app-articoli-card',
  templateUrl: './articoli-card.component.html',
  styleUrl: './articoli-card.component.css'
})
export class ArticoliCardComponent implements OnInit {

  @Input()
  articolo : IArticoli = {
    codart : '',
    descrizione : '',
    um : '',
    pzcart : 0 , 
    peso : 0 ,
    prezzo : 0 ,
    active : true,
    data : new Date(),
    imageUrl : '',
    imageUrls : []
  };
  
  @Output()
  delete = new EventEmitter();
  
  @Output()
  edit = new EventEmitter();

  constructor(){}

  ngOnInit(): void {
    
  }

  editArt = () => this.edit.emit(this.articolo.codart);

  delArt = () => this.delete.emit(this.articolo.codart);

}
