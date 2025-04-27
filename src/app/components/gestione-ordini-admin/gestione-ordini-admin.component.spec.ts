import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneOrdiniAdminComponent } from './gestione-ordini-admin.component';

describe('GestioneOrdiniAdminComponent', () => {
  let component: GestioneOrdiniAdminComponent;
  let fixture: ComponentFixture<GestioneOrdiniAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneOrdiniAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestioneOrdiniAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
