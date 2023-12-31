import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterForm } from 'src/app/interface/register-form';
import { RegisterService } from 'src/app/service/register/register.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  username!: FormControl;
  password!: FormControl;
  firstName!: FormControl;
  middleName!: FormControl;
  lastName!: FormControl;

  matcher = new MyErrorStateMatcher();

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

    this.username = new FormControl(initialFormValues.username, [Validators.required]);
    this.password = new FormControl(initialFormValues.password, [Validators.required]);
    this.firstName = new FormControl(initialFormValues.firstName, [Validators.required]);
    this.middleName = new FormControl(initialFormValues.middleName);
    this.lastName = new FormControl(initialFormValues.lastName);

    // Create a new FormGroup based on the LoginForm interface
    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName
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
