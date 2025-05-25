import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiceviCodiceGoogleComponent } from './ricevi-codice-google.component';

describe('RiceviCodiceGoogleComponent', () => {
  let component: RiceviCodiceGoogleComponent;
  let fixture: ComponentFixture<RiceviCodiceGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiceviCodiceGoogleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiceviCodiceGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
