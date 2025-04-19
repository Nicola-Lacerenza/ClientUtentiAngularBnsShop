import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiestaResoComponent } from './richiesta-reso.component';

describe('RichiestaResoComponent', () => {
  let component: RichiestaResoComponent;
  let fixture: ComponentFixture<RichiestaResoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RichiestaResoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RichiestaResoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
