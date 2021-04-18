import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../model/user';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'bm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm = this.fb.group({
    loginFormEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    loginFormPassword: ['', [Validators.required, Validators.minLength(6)]],
  });
  get loginFormEmail(){
    return this.loginForm.get('loginFormEmail');
  }
  get loginFormPassword(){
    return this.loginForm.get('loginFormPassword');
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.user = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }
  loginUser(): void{
    this.user.username = this.loginForm.get('loginFormEmail')?.value;
    this.user.password = this.loginForm.get('loginFormPassword')?.value;
    this.authService.login(this.user)
      .subscribe(data => {
        console.log('Successful');
      });
  }

}
