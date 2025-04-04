import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHolderComponent } from './carousel-holder.component';

describe('CarouselHolderComponent', () => {
  let component: CarouselHolderComponent;
  let fixture: ComponentFixture<CarouselHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselHolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
