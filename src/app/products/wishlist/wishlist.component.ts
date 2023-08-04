import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
allwishlistItem:any=[]
constructor (private api:ApiService){}

//to hold searchTerm
searchTerm: string=""

//to hold cart item count
cartItemsCount : number =0


search(event:any){
  console.log(event.target.value);
  // to assign new value to behavior subject to use next method
  this.api.searchTerm.next(event.target.value)
}


  ngOnInit(): void {

 // to hold cart item count
 this.api.getCartItemCount.subscribe((data:any)=>{
  console.log(data); // length of the cart array
  this.cartItemsCount = data
  
})


    this.api.getWishlist().subscribe((result:any)=>{
      console.log(result);
      this.allwishlistItem=result
    },
    (result:any)=>{
      console.log(result.error);
      
    })
  }
  //delete api call
  deletewishlist(id:any){
    this.api.deleteWishlist(id).subscribe((result:any)=>{
      this.allwishlistItem=result
      // alert("Product Deleted Successfully")
    },
    (result:any)=>{
      alert(result.error)
    })
  }


  addToCart(product:any){
    console.log(product);
    
    // add quantity to cart
    Object.assign(product,{quantity:1})
    console.log(product);
  
    //api call to add quantity
    this.api.addToCart(product).subscribe((result:any)=>{
      //call cart count
      this.api.cartCount()
      this.deletewishlist(product.id)
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
    })
    
  }
}
