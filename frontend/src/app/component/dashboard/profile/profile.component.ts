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
import { FileService } from 'src/app/service/file/file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ExpiredSessionComponent } from '../../common/expired-session/expired-session.component';
import { AuthService } from 'src/app/service/auth/auth.service';

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
  isSubmitted: boolean = false;
  isCancelled: boolean = false;
  showProgressBar: boolean = false;
  showSubmitButton: boolean = true;
  showCancelButton: boolean = true;
  selectedFile: File | null = null;
  session!: any;

  matcher = new MyErrorStateMatcher();

  constructor
  (
    private _principalService: PrincipalService,
    private _profileService: ProfileService,
    private _logoutService: LogoutService,
    private _fileService: FileService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private _sanitizer: DomSanitizer,
    private _authService: AuthService
  )
  {}

  ngOnInit(): void {
    this.isSessionExpired();
    this.getPrincipalInfo();
  }

  isSessionExpired(): any {

    const session$ = this._authService.checkSession();

    session$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.session = response.message;
      },
      (error) => {
        console.error('Sesssion is expired', error);
        this.openExpiredSessionDialog();
        this._router.navigate(['/login']);
      },
      () => {
      }
    )
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
      last_name: this.principal.lastName
    };

    this.username = new FormControl(initialFormValues.username, [Validators.required]);
    this.first_name = new FormControl(initialFormValues.first_name, [Validators.required]);
    this.middle_name = new FormControl(initialFormValues.middle_name);
    this.last_name = new FormControl(initialFormValues.last_name);

    // Create a new FormGroup based on the LoginForm interface
    this.editProfile = new FormGroup({
      username: this.username,
      firstName: this.first_name,
      middleName: this.middle_name,
      lastName: this.last_name
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
          this.openExpiredSessionDialog();
          this._router.navigate(['/login']);
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

      this.uploadProfilePicture();
    }
  }

  onFileSelected(event: any): void {
    const maxSizeInBytes = 6 * 1024 * 1024; // 6 MB
    const selectedFile = event.target.files[0];

    if (selectedFile.size > maxSizeInBytes) {
      console.warn('Selected file exceeds the maximum allowed size. 5(mb)');
      // Optionally, you can clear the input field or show an error message to the user.
    } else {
      this.selectedFile = selectedFile;
    }
  }

  uploadProfilePicture(): void {
    if (this.selectedFile) {
      this._fileService.uploadFile(this.selectedFile).subscribe(
        (response) => {
        },
        (error) => {
          console.error('File upload failed', error);
        }
      );
    } else {
      console.warn('No file selected');
    }
  }

  getSanitizedImage(image: any): any {
    // Assuming profilePicture is a base64 string
    const imageSrc = `data:image/png;base64,${image}`;
    return this._sanitizer.bypassSecurityTrustResourceUrl(imageSrc);
  }

  openExpiredSessionDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(ExpiredSessionComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
          this._router.navigate(['/login']);
        } else {
          resolve(false); // User canceled leaving
        }
      });
    });
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
