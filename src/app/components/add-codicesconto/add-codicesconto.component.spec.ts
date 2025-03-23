import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCodicescontoComponent } from './add-codicesconto.component';

describe('AddCodicescontoComponent', () => {
  let component: AddCodicescontoComponent;
  let fixture: ComponentFixture<AddCodicescontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCodicescontoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCodicescontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
