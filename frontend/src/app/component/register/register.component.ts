import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  showProgressBar: boolean = false;
  showSubmitButton: boolean = true;
  showCancelButton: boolean = true;

  matcher = new MyErrorStateMatcher();

  constructor
  (
    private _registerService: RegisterService,
    private _router: Router,
    private _snackbar: MatSnackBar
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

  onSubmit()
  {
    this.errorMessage = '';
    if(this.registerForm.valid)
    {
      this.showSubmitButton = false;
      this.showCancelButton = false;
      this.showProgressBar = true; // Show the progress bar

      const registerBody = this.registerForm.value;

      const registerProcess$ = this._registerService.register(registerBody);

      registerProcess$.subscribe
      (
        (response) => {
          if(!response)
          {
            this.showProgressBar = false;
            console.error('Response is empty');
          }
          else
          {
            const result = response.message; // Assuming the token is in the 'message' property

            if(localStorage.getItem(this.tokenKey) != null)
            {
              localStorage.removeItem(this.tokenKey);
              localStorage.setItem(this.tokenKey, result); // Store token in local storage
            }
            else
            {
              localStorage.setItem(this.tokenKey, result); // Store token in local storage
            }
          }
        },
        (error) => {
          console.error('Register Failed', error);
          this.showProgressBar = false;
          this.showSubmitButton = true;
          this.errorMessage = error;
        },
        () => {
          this.errorMessage = '';
          // Upon completion of wallet creation (when the observable completes)
          this.showProgressBar = false; // Hide the progress bar
          this.showSubmitButton = true; // Show the "Add Wallet" button
          this.showCancelButton = true; // Show the "Cancel" button

          this._snackbar.open('Register Successful', 'Close', {
            duration: 1000,
          }).afterDismissed().subscribe(() => {
            this._router.navigate(['/login']);
          });
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
