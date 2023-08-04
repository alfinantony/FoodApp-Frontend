import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-portfolio',
  templateUrl: './all-portfolio.component.html',
  styleUrls: ['./all-portfolio.component.css']
})
export class AllPortfolioComponent {

  constructor(private api:ApiService){}
//to hold searchTerm
searchTerm: string=""
search(event:any){
  console.log(event.target.value);
  // to assign new value to behavior subject to use next method
  this.api.searchTerm.next(event.target.value)
}
}
