import { Component,OnInit } from '@angular/core';
import { IArticoli } from '../../models/Articoli';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrl: './articoli.component.css'
})
export class ArticoliComponent implements OnInit {

  articoli : IArticoli[] = []
  constructor() {}
  ngOnInit(): void {
    
  }
}
