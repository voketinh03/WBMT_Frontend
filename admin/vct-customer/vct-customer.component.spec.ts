import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VCTCustomerComponent } from './vct-customer.component';

describe('VCTCustomerComponent', () => {
  let component: VCTCustomerComponent;
  let fixture: ComponentFixture<VCTCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VCTCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VCTCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
