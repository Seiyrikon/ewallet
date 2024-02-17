import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginForm } from 'src/app/interface/login-form';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoginService } from 'src/app/service/login/login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  username!: FormControl;
  password!: FormControl;
  showProgressBar: boolean = false;
  showSubmitButton: boolean = true;
  showCancelButton: boolean = true;
  isSessionExpired!: any;
  sessionKey: string = "expiredSession"

  matcher = new MyErrorStateMatcher();

  constructor
  (
    private _loginService: LoginService,
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _authService: AuthService
  )
  {}

  ngOnInit(): void {
    this.isSessionExpired = localStorage.getItem(this.sessionKey)
    this.initializeForm()
  }

  initializeForm() {
    const initialFormValues: LoginForm = {
      username: '', // Provide initial values according to the interface
      password: ''
    };

    this.username = new FormControl(initialFormValues.username, [Validators.required]);
    this.password = new FormControl(initialFormValues.password, [Validators.required]);

    // Create a new FormGroup based on the LoginForm interface
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onSubmit()
  {
    this.errorMessage = '';
    if(this.loginForm.valid)
    {
      this.showSubmitButton = false;
      this.showCancelButton = false;
      this.showProgressBar = true; // Show the progress bar

      const loginBody = this.loginForm.value;

      const loginProcess$ = this._loginService.authenticate(loginBody);

      loginProcess$.subscribe
      (
        (response) => {
          if(!response)
          {
            this.showProgressBar = false;
            console.error('Response is empty');
            console.log("Hello");

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
          console.error('Login Failed', error);
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

          this._snackbar.open('Login Successful', 'Close', {
            duration: 1000,
          }).afterDismissed().subscribe(() => {
            this._router.navigate(['/dashboard']);
          });
        }
      )
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem(this.sessionKey);
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
