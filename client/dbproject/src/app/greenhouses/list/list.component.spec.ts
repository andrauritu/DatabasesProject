import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhouseListComponent } from './list.component';

describe('ListComponent', () => {
  let component: GreenhouseListComponent;
  let fixture: ComponentFixture<GreenhouseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GreenhouseListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GreenhouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
