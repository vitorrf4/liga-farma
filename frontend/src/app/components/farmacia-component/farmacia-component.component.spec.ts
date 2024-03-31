import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciaComponentComponent } from './farmacia-component.component';

describe('FarmaciaComponentComponent', () => {
  let component: FarmaciaComponentComponent;
  let fixture: ComponentFixture<FarmaciaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmaciaComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarmaciaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
