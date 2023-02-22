import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCallerComponent } from './contract-caller.component';

describe('ContractCallerComponent', () => {
  let component: ContractCallerComponent;
  let fixture: ComponentFixture<ContractCallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractCallerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractCallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
