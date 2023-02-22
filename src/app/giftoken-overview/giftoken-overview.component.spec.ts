import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftokenOverviewComponent } from './giftoken-overview.component';

describe('GiftokenOverviewComponent', () => {
  let component: GiftokenOverviewComponent;
  let fixture: ComponentFixture<GiftokenOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftokenOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftokenOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
