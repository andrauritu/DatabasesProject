import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhouseShowComponent } from './show.component';

describe('GreenhouseShowComponent', () => {
  let component: GreenhouseShowComponent;
  let fixture: ComponentFixture<GreenhouseShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GreenhouseShowComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GreenhouseShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
