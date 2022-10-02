import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { userLogin } from 'src/app/model/userLogin';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private service : UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  formLogin: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.fb.group({
      email: [null],
      password: [null],
    })
  }

  login(){
    this.service.loginAsync(this.formLogin.value).then(x => {
      console.log(x)
      if(x){
        this.router.navigateByUrl('/dashboard')
      }
    })
  }

}
