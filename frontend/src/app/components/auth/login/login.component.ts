import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../model/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'bm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  get username(){
    return this.loginForm.get('username');
  }
  get password(){
    return this.loginForm.get('password');
  }
  constructor(private fb: FormBuilder, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.createLoginForm();
  }
  loginUser(): void{
    this.user = Object.assign({}, this.loginForm.value);
    this.authService.login(this.user)
      .subscribe(data => {
        console.log('Successful');
      });
  }
  private createLoginForm(): void{
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
