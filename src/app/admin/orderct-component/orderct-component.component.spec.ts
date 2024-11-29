import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderctComponentComponent } from './orderct-component.component';

describe('OrderctComponentComponent', () => {
  let component: OrderctComponentComponent;
  let fixture: ComponentFixture<OrderctComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderctComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderctComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
