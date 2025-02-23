import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-articoli-card',
  templateUrl: './articoli-card.component.html',
  styleUrl: './articoli-card.component.css'
})
export class ArticoliCardComponent implements OnInit {

  @Input()
  
  @Output()
  delete = new EventEmitter();
  
  @Output()
  edit = new EventEmitter();

  constructor(){}

  ngOnInit(): void {
    
  }

  editArt = () => this.edit.emit();

  delArt = () => this.delete.emit();

}
