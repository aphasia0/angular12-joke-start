import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderJokeComponent } from './header-joke.component';

describe('HeaderJokeComponent', () => {
  let component: HeaderJokeComponent;
  let fixture: ComponentFixture<HeaderJokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderJokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderJokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
