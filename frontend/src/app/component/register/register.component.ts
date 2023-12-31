import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterForm } from 'src/app/interface/register-form';
import { RegisterService } from 'src/app/service/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy
{
  registerForm!: FormGroup;
  private _subscription!: Subscription;
  errorMessage: string = '';
  tokenKey: string = 'token';

  constructor
  (
    private _registerService: RegisterService,
    private _router: Router
  ) {}

  ngOnInit(): void
  {
    this.initializeForm();
  }

  initializeForm() {
    const initialFormValues: RegisterForm = {
      username: '', // Provide initial values according to the interface
      password: '',
      firstName: '',
      middleName: '',
      lastName: ''
    };

    // Create a new FormGroup based on the LoginForm interface
    this.registerForm = new FormGroup({
      username: new FormControl(initialFormValues.username, [Validators.required]),
      password: new FormControl(initialFormValues.password, [Validators.required]),
      firstName: new FormControl(initialFormValues.firstName, [Validators.required]),
      middleName: new FormControl(initialFormValues.middleName, [Validators.required]),
      lastName: new FormControl(initialFormValues.lastName, [Validators.required])
    });
  }

  onSubmit(): any{
    if(this.registerForm.valid)
    {
      const registerBody = this.registerForm.value;

      this._subscription = this._registerService.register(registerBody)
      .subscribe(
        (response) => {
          if (response) {
            const result = response.message; // Assuming the token is in the 'message' property

            if(localStorage.getItem(this.tokenKey) != null)
            {
              localStorage.removeItem(this.tokenKey);
              localStorage.setItem(this.tokenKey, result); // Store token in local storage
              this._router.navigate(['/login']);
            }
            else
            {
              localStorage.setItem(this.tokenKey, result); // Store token in local storage
              this._router.navigate(['/login']);
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
