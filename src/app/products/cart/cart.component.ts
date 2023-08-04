import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

proceedtopay: boolean=false

  //from paypal
  public payPalConfig?: IPayPalConfig;

  //paypal success
  showSuccess: boolean =false


  // offer click
   offerClick: boolean =false;

   //discount 
   discountStatus:boolean =false;

  username:any
  houseNumber:any
  pincode: any
  mobileNumber: any

  //to hold payment status
  paymentStatus :boolean =false;

  //to hold total price
  totalPrice: number = 0

  //to hold the array cart item
  allCart: any = []
  constructor(private api: ApiService, private fb: FormBuilder) { }

  //address form
  addressForm = this.fb.group({
    //array
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    houseNumber: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    street: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    state: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
    mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
  })

  //to hold searchTerm
  searchTerm: string = ""

  //to hold cart item count
  cartItemsCount: number = 0


  search(event: any) {
    console.log(event.target.value);
    // to assign new value to behavior subject to use next method
    this.api.searchTerm.next(event.target.value)
  }

  ngOnInit(): void {

    //paypal function call
    this.initConfig();

    // to hold cart item count
    this.api.getCartItemCount.subscribe((data: any) => {
      console.log(data); // length of the cart array
      this.cartItemsCount = data

    })

    this.api.getCart().subscribe((result: any) => {
      console.log(result);
      this.allCart = result
      //call cart total
      this.getCartItem()
    },
      (result: any) => {
        console.log(result.error);
      })
  }

  //delete cart
  removeCartItem(id: any) {
    this.api.removeCartItem(id).subscribe((result: any) => {
      console.log(result);
      // remaining cart item added to the allcart
      this.allCart = result
      this.api.cartCount()
    },
      (result: any) => {
        console.log(result.error);
      })

  }

  //get cart total
  getCartItem() {
    let total = 0;
    this.allCart.forEach((item: any) => {
      total = total + item.grandTotal
      this.totalPrice = Math.ceil(total)
    })
  }

  //increment cart

  incrementCart(id: any) {
    this.api.incrementCartCount(id).subscribe((result: any) => {
      this.allCart = result;
      this.getCartItem()
    },
      (result: any) => {
        alert(result.error)
      })
  }


  //decrement cart

  decrementCart(id: any) {
    this.api.decrementCartCount(id).subscribe((result: any) => {
      this.allCart = result;
      this.getCartItem()
    },
      (result: any) => {
        alert(result.error)
      })
  }

  //submit form

  submitForm() {
    //to check the address is valid
    if (this.addressForm.valid) {
      this.paymentStatus=true
      this.username=this.addressForm.value.username
      this.houseNumber=this.addressForm.value.houseNumber
      this.pincode=this.addressForm.value.pincode
      this.mobileNumber=this.addressForm.value.mobileNumber
    }
    else {
      alert("Please enter valid details")
    }
  }

  offerClicked(){
    this.offerClick = true
  }
  discount(value:any){
    this.totalPrice = Math.ceil(this.totalPrice*(100-value)/100)
    this.offerClick= false
    this.discountStatus = true
  }

  // make payment

    makepay(){
      this.proceedtopay=true
    }

    //close
    modalClose(){
      this.addressForm.reset()
      this.showSuccess =false
      this.paymentStatus =false
    }

  // paypal

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }


}