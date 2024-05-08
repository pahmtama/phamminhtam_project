import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideHeroComponent } from './slide-hero.component';

describe('SlideHeroComponent', () => {
  let component: SlideHeroComponent;
  let fixture: ComponentFixture<SlideHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
