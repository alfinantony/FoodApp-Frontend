import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // regErrorMsg: string = '';
  // regSuccessMsg: string = "";

  constructor(private loginFB: FormBuilder, private api: ApiService, private router: Router) { }

  loginForm = this.loginFB.group({
    fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  });

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      let fname = this.loginForm.value.fname;
      let password = this.loginForm.value.password;

      this.api.login(fname, password).subscribe(
        (result: any) => {
          console.log(result);
          alert(result.message);

          this.router.navigateByUrl('/products');
          // Move the "login Successful" alert inside the subscribe block
          alert('Login Successful');
        },
        (error) => {
          // Handle error if the API call fails
          alert('Login Failed. Please check your credentials or try again later.');
        }
      );
    } else {
      alert('Please enter valid credentials');
    }
  }
}