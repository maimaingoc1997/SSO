import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaserBannerComponent } from './teaser-banner.component';

describe('TeaserBannerComponent', () => {
  let component: TeaserBannerComponent;
  let fixture: ComponentFixture<TeaserBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeaserBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeaserBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
