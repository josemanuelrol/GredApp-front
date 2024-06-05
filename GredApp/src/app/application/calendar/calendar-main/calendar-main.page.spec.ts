import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarMainPage } from './calendar-main.page';

describe('CalendarMainPage', () => {
  let component: CalendarMainPage;
  let fixture: ComponentFixture<CalendarMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
