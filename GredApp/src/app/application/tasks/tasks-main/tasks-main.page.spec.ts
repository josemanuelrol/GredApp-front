import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksMainPage } from './tasks-main.page';

describe('TasksMainPage', () => {
  let component: TasksMainPage;
  let fixture: ComponentFixture<TasksMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
