import { Component,OnInit } from '@angular/core';
import { IArticoli } from '../../models/Articoli';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrl: './articoli.component.css'
})
export class ArticoliComponent implements OnInit {

  articoli : IArticoli[] = [
    {codart : "014600301" , descrizione : "BARILLA 1 KG" , um : "PZ" ,pzcart: 24 , peso : 1 , prezzo : 1.09, active : true, data : new Date()},
    {codart : "013500121" , descrizione : "BARILLA PASTA 500g" , um : "PZ" ,pzcart: 30 , peso : 0.5 , prezzo : 3.09, active : true, data : new Date()},
    {codart : "007686402" , descrizione : "FINDUS 300g" , um : "PZ" ,pzcart: 8 , peso : 0.3 , prezzo : 4.09, active : true, data : new Date()},
    {codart : "057549001" , descrizione : "FINDUS 400g " , um : "PZ" ,pzcart: 12 , peso : 0.4 , prezzo : 5.09, active : true, data : new Date()}
  ]
  constructor() {}
  ngOnInit(): void {
    
  }
}
