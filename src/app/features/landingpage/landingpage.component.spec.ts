import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageComponent } from './landingpage.component';

describe('LandingpageComponent', () => {
  let component: LandingpageComponent;
  let fixture: ComponentFixture<LandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
