import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigMainPage } from './config-main.page';

describe('ConfigMainPage', () => {
  let component: ConfigMainPage;
  let fixture: ComponentFixture<ConfigMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
