import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../products/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  regErrorMsg: string = '';
  regSuccessMsg: string = "";
  constructor(private registerFB: FormBuilder, private api: ApiService, private router: Router) { }

 //form group 
registerForm = this.registerFB.group({
  fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
  email: ['', [Validators.required, Validators.email]],
  mobile: ['', [Validators.required, Validators.pattern('[0-9]*')]], 
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
});

  //control passes to html
  register() {

    if (this.registerForm.valid) {
      console.log(this.registerForm);
      let fname = this.registerForm.value.fname;
      let password = this.registerForm.value.password;
      let mobile = this.registerForm.value.mobile;
      let email = this.registerForm.value.email;




      this.api.register(fname, password, mobile, email).subscribe((result: any) => {
        console.log(result);
        alert(result.message);
        this.regSuccessMsg = result.message;
        setTimeout(() => {
          this.router.navigateByUrl('')
        }, 2000)


      },
        (result: any) => {
          //error msg
          this.regErrorMsg = result.error.message;
          setTimeout(() => {
            this.registerForm.reset()
            this.regErrorMsg = ""
          }, 2000)
        }
      )

      alert('Registration Success')
    }
    else {
      alert('Invalid Registration')
    }

  }



}


