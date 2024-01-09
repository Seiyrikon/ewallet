import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from './shared/auth.interceptor';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { Error404Component } from './component/error404/error404.component';
import { TopNavComponent } from './component/dashboard/top-nav/top-nav.component';
import { MainContentComponent } from './component/dashboard/main-content/main-content.component';
import { WalletComponent } from './component/dashboard/wallet/wallet.component';
import { ProfileComponent } from './component/dashboard/profile/profile.component';
import { TransactionComponent } from './component/dashboard/transaction/transaction.component';
import { AddWalletComponent } from './component/dashboard/wallet/add-wallet/add-wallet.component';
import { ViewWalletComponent } from './component/dashboard/wallet/view-wallet/view-wallet.component';
import { DepositComponent } from './component/dashboard/wallet/view-wallet/deposit/deposit.component';
import { WithdrawComponent } from './component/dashboard/wallet/view-wallet/withdraw/withdraw.component';
import { RegisterComponent } from './component/register/register.component';
import { LogoutModalComponent } from './component/common/logout-modal/logout-modal.component';

import {MatDialogModule} from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CancelModalComponent } from './component/common/cancel-modal/cancel-modal.component';
import { LeaveModalComponent } from './component/common/leave-modal/leave-modal.component';
import { DeleteModalComponent } from './component/common/delete-modal/delete-modal.component';
import { SideNavComponent } from './component/dashboard/side-nav/side-nav.component';
import { FriendComponent } from './component/dashboard/friend/friend.component';
import { RequestComponent } from './component/dashboard/request/request.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    Error404Component,
    TopNavComponent,
    MainContentComponent,
    WalletComponent,
    ProfileComponent,
    TransactionComponent,
    AddWalletComponent,
    ViewWalletComponent,
    DepositComponent,
    WithdrawComponent,
    RegisterComponent,
    LogoutModalComponent,
    CancelModalComponent,
    LeaveModalComponent,
    DeleteModalComponent,
    SideNavComponent,
    FriendComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
