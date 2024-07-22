import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSocieteComponent } from './update-societe.component';

describe('UpdateSocieteComponent', () => {
  let component: UpdateSocieteComponent;
  let fixture: ComponentFixture<UpdateSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSocieteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
