import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaComponentComponent } from './vaga-component.component';

describe('VagaComponentComponent', () => {
  let component: VagaComponentComponent;
  let fixture: ComponentFixture<VagaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagaComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VagaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
