import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoProdottiResiComponent } from './elenco-prodotti-resi.component';

describe('ElencoProdottiResiComponent', () => {
  let component: ElencoProdottiResiComponent;
  let fixture: ComponentFixture<ElencoProdottiResiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElencoProdottiResiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElencoProdottiResiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
