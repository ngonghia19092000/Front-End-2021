import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainslideComponent } from './mainslide.component';

describe('MainslideComponent', () => {
  let component: MainslideComponent;
  let fixture: ComponentFixture<MainslideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainslideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
