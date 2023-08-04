import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-view',
  templateUrl: './all-view.component.html',
  styleUrls: ['./all-view.component.css']
})
export class AllViewComponent implements OnInit {
productId :string=""

//to hold cart item count
cartItemsCount : number =0


constructor(private viewRoute:ActivatedRoute, private api:ApiService){}
//to hold particular product details
product: any=[]
ngOnInit(): void {

  // to hold cart item count
  this.api.getCartItemCount.subscribe((data:any)=>{
    console.log(data); // length of the cart array
    this.cartItemsCount = data
    
  })


  this.viewRoute.params.subscribe((result:any)=>{
    console.log(result);
    console.log(result.productId);
    this.productId = result.productId;
    
    // to fetch product details
    this.api.viewProduct(this.productId).subscribe((result:any)=>{
      console.log(result);
      this.product = result
    },
    (result:any)=>{
      console.log(result.error);  
    })
  })
}

//api function to add product to wishlist
addToWishlist(){
  //destructure
  const {id,title,price,image}= this.product
  //api function
  this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result);
  },
  (result:any)=>{
    alert(result.error); //error message
  })
}

addTocart(product:any){
  console.log(product);
  
  // add quantity to cart
  Object.assign(product,{quantity:1})
  console.log(product);

  //api call to add quantity
  this.api.addToCart(product).subscribe((result:any)=>{
    //call cart count
    this.api.cartCount()
    alert(result)
  },
  (result:any)=>{
    alert(result.error)
  })
  
}
}
