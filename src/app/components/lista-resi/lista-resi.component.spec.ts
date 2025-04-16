import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaResiComponent } from './lista-resi.component';

describe('ListaResiComponent', () => {
  let component: ListaResiComponent;
  let fixture: ComponentFixture<ListaResiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaResiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaResiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
