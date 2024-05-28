import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListDetailPage } from './task-list-detail.page';

describe('TaskListDetailPage', () => {
  let component: TaskListDetailPage;
  let fixture: ComponentFixture<TaskListDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
