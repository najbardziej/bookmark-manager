import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/user';

@Component({
  selector: 'bm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get passwordConf(){
    return this.registerForm.get('passwordConf');
  }
  ngOnInit(): void {
    this.createRegisterForm();
  }
  private createRegisterForm(): void{
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConf: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }
  registerUser(): void{
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user)
      .subscribe(data => {
        console.log('Successful');
      });
  }
  passwordMatchValidator(fg: FormGroup): { [key: string]: boolean} | null{
    return fg.get('password').value === fg.get('passwordConf').value ? null : { 'mismatch' : true};
  }
}
