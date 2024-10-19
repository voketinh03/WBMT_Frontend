import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsBookComponent } from './ds-book.component';

describe('DsBookComponent', () => {
  let component: DsBookComponent;
  let fixture: ComponentFixture<DsBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DsBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
