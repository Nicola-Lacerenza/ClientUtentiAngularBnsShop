import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneOrdiniInviaEmailComponent } from './gestione-ordini-invia-email.component';

describe('GestioneOrdiniInviaEmailComponent', () => {
  let component: GestioneOrdiniInviaEmailComponent;
  let fixture: ComponentFixture<GestioneOrdiniInviaEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneOrdiniInviaEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestioneOrdiniInviaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
