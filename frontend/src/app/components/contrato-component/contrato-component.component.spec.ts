import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoComponentComponent } from './contrato-component.component';

describe('ContratoComponentComponent', () => {
  let component: ContratoComponentComponent;
  let fixture: ComponentFixture<ContratoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContratoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
