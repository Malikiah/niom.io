import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramValidationComponent } from './instagram-validation.component';

describe('InstagramValidationComponent', () => {
  let component: InstagramValidationComponent;
  let fixture: ComponentFixture<InstagramValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagramValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
