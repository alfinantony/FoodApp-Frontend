import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPortfolioComponent } from './all-portfolio.component';

describe('AllPortfolioComponent', () => {
  let component: AllPortfolioComponent;
  let fixture: ComponentFixture<AllPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPortfolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
