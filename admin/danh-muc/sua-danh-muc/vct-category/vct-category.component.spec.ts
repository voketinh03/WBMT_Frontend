import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VctCategoryComponent } from './vct-category.component';

describe('VctCategoryComponent', () => {
  let component: VctCategoryComponent;
  let fixture: ComponentFixture<VctCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VctCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VctCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
