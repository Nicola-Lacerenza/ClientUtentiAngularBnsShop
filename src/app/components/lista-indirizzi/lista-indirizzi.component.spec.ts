import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIndirizziComponent } from './lista-indirizzi.component';

describe('ListaIndirizziComponent', () => {
  let component: ListaIndirizziComponent;
  let fixture: ComponentFixture<ListaIndirizziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaIndirizziComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaIndirizziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
