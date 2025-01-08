import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemSuaBookComponent } from './them-sua-book.component';

describe('ThemSuaBookComponent', () => {
  let component: ThemSuaBookComponent;
  let fixture: ComponentFixture<ThemSuaBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemSuaBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemSuaBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
