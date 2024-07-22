import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterCoursesComponent } from './consulter-courses.component';

describe('ConsulterCoursesComponent', () => {
  let component: ConsulterCoursesComponent;
  let fixture: ComponentFixture<ConsulterCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
