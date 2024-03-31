import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaceuticoComponentComponent } from './farmaceutico-component.component';

describe('FarmaceuticoComponentComponent', () => {
  let component: FarmaceuticoComponentComponent;
  let fixture: ComponentFixture<FarmaceuticoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmaceuticoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarmaceuticoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
