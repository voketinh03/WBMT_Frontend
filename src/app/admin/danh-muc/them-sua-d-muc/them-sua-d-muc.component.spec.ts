import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemSuaDMucComponent } from './them-sua-d-muc.component';

describe('ThemSuaDMucComponent', () => {
  let component: ThemSuaDMucComponent;
  let fixture: ComponentFixture<ThemSuaDMucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemSuaDMucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemSuaDMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
