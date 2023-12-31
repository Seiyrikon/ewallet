import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
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
    RegisterComponent
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
    HttpClientModule
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
