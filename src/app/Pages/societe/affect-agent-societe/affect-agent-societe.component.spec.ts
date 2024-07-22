import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectAgentSocieteComponent } from './affect-agent-societe.component';

describe('AffectAgentSocieteComponent', () => {
  let component: AffectAgentSocieteComponent;
  let fixture: ComponentFixture<AffectAgentSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectAgentSocieteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectAgentSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
