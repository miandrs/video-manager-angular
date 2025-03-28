import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductViewComponent } from './card-product-view.component';

describe('CardProductViewComponent', () => {
  let component: CardProductViewComponent;
  let fixture: ComponentFixture<CardProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardProductViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
