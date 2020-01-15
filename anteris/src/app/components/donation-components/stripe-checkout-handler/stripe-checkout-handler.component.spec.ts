import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeCheckoutHandlerComponent } from './stripe-checkout-handler.component';

describe('StripeCheckoutHandlerComponent', () => {
  let component: StripeCheckoutHandlerComponent;
  let fixture: ComponentFixture<StripeCheckoutHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeCheckoutHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeCheckoutHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
