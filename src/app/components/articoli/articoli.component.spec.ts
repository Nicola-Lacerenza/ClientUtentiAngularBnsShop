/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticoliComponent } from './articoli.component';

describe('ArticoliComponent', () => {
  let component: ArticoliComponent;
  let fixture: ComponentFixture<ArticoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticoliComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
// app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ArticoliComponent } from './articoli.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AppComponent – ApplicaFiltri', () => {
  let component: ArticoliComponent;
  let fixture: ComponentFixture<ArticoliComponent>;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      FormsModule,
      HttpClientTestingModule    // ← aggiungi questo per HttpClient
    ],
    declarations: [ ArticoliComponent ]
  })
  .compileComponents();

  fixture = TestBed.createComponent(ArticoliComponent);
  component = fixture.componentInstance;
});
 
  function makeForm(value: any): NgForm {
    // stub minimale di NgForm
    return { value } as NgForm;
  }

  it('dovrebbe produrre lista vuota se _prodotti è vuoto', () => {
    component['_prodotti'] = [];
    component.ApplicaFiltri(makeForm({}));
    expect(component.prodottiFiltrati).toEqual([]);
  });

  it('dovrebbe raggruppare correttamente prodotti con modelli diversi', () => {
    const p1 = { immagini: ['i1'], prodotto: { id: 1, id_modello: 10, nome_modello: 'A' } } as any;
    const p2 = { immagini: ['i2'], prodotto: { id: 2, id_modello: 20, nome_modello: 'B' } } as any;
    component['_prodotti'] = [ p1, p2 ];
    component.ApplicaFiltri(makeForm({}));
    // due gruppi distinti
    expect(component.prodottiFiltrati.length).toBe(2);
    const modelli = component.prodottiFiltrati.map(g => g.modello);
    expect(modelli).toContain('A');
    expect(modelli).toContain('B');
  });

  it('dovrebbe raggruppare correttamente prodotti con stesso modello', () => {
    const commonProd = { id_modello: 5, nome_modello: 'X' };
    const p1 = { immagini: ['i1'], prodotto: { ...commonProd, id: 11 } } as any;
    const p2 = { immagini: ['i2'], prodotto: { ...commonProd, id: 12 } } as any;
    component['_prodotti'] = [ p1, p2 ];
    component.ApplicaFiltri(makeForm({}));
    expect(component.prodottiFiltrati.length).toBe(1);
    const grp = component.prodottiFiltrati[0];
    expect(grp.modello).toBe('X');
    expect(grp.prodotti.length).toBe(2);
    // currentImage e currentProductId dal primo elemento
    expect(grp.currentImage).toBe('i1');
    expect(grp.currentProductId).toBe(11);
  });
});
