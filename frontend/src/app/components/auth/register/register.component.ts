import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/user';

@Component({
  selector: 'bm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm = this.fb.group({
    registerFormEmail: ['', [Validators.required, Validators.email]],
    registerFormPassword: ['', [Validators.required, Validators.minLength(6)]],
    registerFormPasswordConfirmation: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.user = {
      username: '',
      password: ''
    };
  }
  get registerFormEmail() {
    return this.registerForm.get('registerFormEmail');
  }
  get registerFormPassword() {
    return this.registerForm.get('registerFormPassword');
  }
  get registerFormPasswordConfirmation(){
    return this.registerForm.get('registerFormPasswordConfirmation');
  }

  ngOnInit(): void {
  }
  registerUser(): void{
    this.user.username = this.registerForm.get('registerFormEmail')?.value;
    this.user.password = this.registerForm.get('registerFormPassword')?.value;
    this.authService.register(this.user)
      .subscribe(data => {
        console.log('Successful');
      });
  }
}
