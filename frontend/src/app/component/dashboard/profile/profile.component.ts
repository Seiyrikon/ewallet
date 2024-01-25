import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditProfileForm } from 'src/app/interface/edit-profile-form';
import { Principal } from 'src/app/interface/principal';
import { LogoutService } from 'src/app/service/logout/logout.service';
import { OverallbalanceService } from 'src/app/service/overall/overallbalance.service';
import { PrincipalService } from 'src/app/service/principal/principal.service';
import { CancelModalComponent } from '../../common/cancel-modal/cancel-modal.component';
import { LeaveModalComponent } from '../../common/leave-modal/leave-modal.component';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription;
  principal!: Principal;
  errorMessage: string = '';
  isEditFormVisible: boolean = false;
  editProfile!: FormGroup;
  username!: FormControl;
  first_name!: FormControl;
  middle_name!: FormControl;
  last_name!: FormControl;
  profilePicture!: FormControl;
  isSubmitted: boolean = false;
  isCancelled: boolean = false;
  showProgressBar: boolean = false;
  showSubmitButton: boolean = true;
  showCancelButton: boolean = true;
  fileSizeExceedsLimit: boolean = false;

  matcher = new MyErrorStateMatcher();

  constructor
  (
    private _principalService: PrincipalService,
    private _profileService: ProfileService,
    private _logoutService: LogoutService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar
  )
  {}

  ngOnInit(): void {
    this.getPrincipalInfo();
  }

  getPrincipalInfo(): any {
    this.showProgressBar = true;

    const principal$ = this._principalService.getPrincipalInfo();

    principal$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.principal = response.message[0];
      },
      (error) => {
        console.error('Principal Info not found', error);
        this.errorMessage = error;
        this.showProgressBar = false;
      },
      () => {
        this.showProgressBar = false;
      }
    )
  }

  initializeForm() {

    const initialFormValues: EditProfileForm = {
      username: this.principal.username, // Provide initial values according to the interface
      first_name: this.principal.firstName,
      middle_name: this.principal.middleName,
      last_name: this.principal.lastName,
      profilePicture: this.principal.profilePicture // Set an initial value if needed
    };

    this.username = new FormControl(initialFormValues.username, [Validators.required]);
    this.first_name = new FormControl(initialFormValues.first_name, [Validators.required]);
    this.middle_name = new FormControl(initialFormValues.middle_name);
    this.last_name = new FormControl(initialFormValues.last_name);
    this.profilePicture = new FormControl(initialFormValues.profilePicture);

    // Create a new FormGroup based on the LoginForm interface
    this.editProfile = new FormGroup({
      username: this.username,
      firstName: this.first_name,
      middleName: this.middle_name,
      lastName: this.last_name,
      profilePicture: this.profilePicture
    });
  }

  //modal for cancel button
  openCancelConfirmationDialog(): Promise<boolean> {
    this.isCancelled = !this.isCancelled;
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(CancelModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
          this.isEditFormVisible = false;
          this.errorMessage = '';
        } else {
          resolve(false); // User canceled leaving
        }
      });
    });
  }

  //guard for leaving a route if form has unsaved value
  openLeaveConfirmationDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(LeaveModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
        } else {
          resolve(false); // User canceled leaving
        }
      });
    });
  }

  onUpdate() {
    this.initializeForm();
    this.isEditFormVisible = !this.isEditFormVisible;
  }

  onSubmit() {
    this.errorMessage = '';
    this.isSubmitted = !this.isSubmitted;
    this.getPrincipalInfo();

    if (this.editProfile.valid)
    {
      this.showSubmitButton = false;
      this.showCancelButton = false;
      this.showProgressBar = true; // Show the progress bar

      const editProfileBody = this.editProfile.value;
      console.log(editProfileBody);

      // Display the progress bar while the wallet creation is in progress
      const editProfile$ = this._profileService.editProfile(editProfileBody);

      editProfile$.subscribe(
        (response) => {
          if (!response) {
            console.error('Response is empty');
          }
        },
        (error) => {
          console.error('Edit profile failed', error);
          this.errorMessage = error;
        },
        () => {
          // Upon completion of wallet creation (when the observable completes)
          this.showProgressBar = false; // Hide the progress bar
          this.showSubmitButton = true; // Show the "Add Wallet" button
          this.showCancelButton = true; // Show the "Cancel" button

          this._snackbar.open('Profile edited successfully!', 'Close', {
            duration: 1000, // Display duration in milliseconds (2 seconds) for the snackbar
          }).afterDismissed().subscribe(() => {
            this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['profile'] } }]);
            this.getPrincipalInfo();
            this.isEditFormVisible = false;
          });
        }
      );
    }
  }

  handleProfilePictureChange(event: any): void {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      // Read the selected file as a data URL and set it to the profilePicture form control
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target){
          this.profilePicture.setValue(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Clear the profilePicture form control if no file is selected
      this.profilePicture.setValue('');
    }
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
