import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  //to hold products details
  allproducts: any=[]

  //to hold searchTerm
searchTerm: string=""

  constructor(private api:ApiService){}
   
//to hold searchTerm
// searchTerm: string=""

//to hold cart item count
cartItemsCount : number =0

search(event:any){
  console.log(event.target.value);
  // to assign new value to behavior subject to use next method
  this.api.searchTerm.next(event.target.value)
}

   ngOnInit():void{  

  // to hold cart item count
  this.api.getCartItemCount.subscribe((data:any)=>{
    console.log(data); // length of the cart array
    this.cartItemsCount = data
    
  })

    this.api.getAllProducts().subscribe((result:any)=>{
      console.log(result);
      this.allproducts=result;
    })
    // this.searchTerm = this.api.searchTerm
    // console.log(this.searchTerm);
    this.api.searchTerm.subscribe((result:any)=>{
      this.searchTerm=result;
      console.log(this.searchTerm);
      
    })
   }

}
