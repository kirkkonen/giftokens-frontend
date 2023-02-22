import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewGalleryComponent } from './overview-gallery.component';

describe('OverviewGalleryComponent', () => {
  let component: OverviewGalleryComponent;
  let fixture: ComponentFixture<OverviewGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
