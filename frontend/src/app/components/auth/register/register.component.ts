import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, AbstractControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/user';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean} | null {
  const passwordField = c.get('registerFormPassword');
  const confField = c.get('registerFormPasswordConfirmation');
  if (passwordField?.pristine || confField?.pristine) {
    return null;
  }
  if (passwordField?.value === confField?.value){
    return null;
  }
  return { match: true };
}
@Component({
  selector: 'bm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  passwordGroup!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.user = {
      username: '',
      password: ''
    };
    this.registerForm = this.fb.group({
      registerFormEmail: ['', [Validators.required, Validators.email]],
        registerFormPassword: ['', [Validators.required, Validators.minLength(6)]],
        registerFormPasswordConfirmation: ['', Validators.required]
    });
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
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user)
      .subscribe(data => {
        console.log('Successful');
      });
  }
}
