import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginForm } from 'src/app/interface/login-form';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy
{
  loginForm!: FormGroup;
  private _subscription!: Subscription;
  errorMessage: string = '';
  tokenKey: string = 'token';

  constructor
  (
    private _loginService: LoginService,
    private _router: Router
  )
  {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    const initialFormValues: LoginForm = {
      username: '', // Provide initial values according to the interface
      password: ''
    };

    // Create a new FormGroup based on the LoginForm interface
    this.loginForm = new FormGroup({
      username: new FormControl(initialFormValues.username, [Validators.required]),
      password: new FormControl(initialFormValues.password, [Validators.required])
    });
  }

  onSubmit()
  {
    if(this.loginForm.valid)
    {
      const loginBody = this.loginForm.value;

      this._subscription = this._loginService.authenticate(loginBody)
      .subscribe(
        (response) => {
          if (response && response.message) {
            const result = response.message; // Assuming the token is in the 'message' property
            console.log(result);

            if(localStorage.getItem(this.tokenKey) != null)
            {
              localStorage.removeItem(this.tokenKey);
              localStorage.setItem(this.tokenKey, result); // Store token in local storage
              this._router.navigate(['/dashboard']);
            }
            else
            {
              localStorage.setItem(this.tokenKey, result); // Store token in local storage
              this._router.navigate(['/dashboard']);
            }

            // Perform any additional actions after successful login
            // For example, redirect the user to a different page
          }
          else
          {
            console.error('Token not found in response');
          }
        },
        (error) => {
          console.error('Login Failed', error);
          this.errorMessage = error;
        }
      )
    }
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
