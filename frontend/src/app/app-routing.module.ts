import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GuardService } from './service/guard/guard.service';
import { Error404Component } from './component/error404/error404.component';
import { WalletComponent } from './component/dashboard/wallet/wallet.component';
import { MainContentComponent } from './component/dashboard/main-content/main-content.component';
import { ProfileComponent } from './component/dashboard/profile/profile.component';
import { TransactionComponent } from './component/dashboard/transaction/transaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', outlet: 'contentOutlet' }, // Redirect to 'main-content' by default
      { path: 'home', component: MainContentComponent, canActivate: [GuardService], outlet: 'contentOutlet' },
      { path: 'wallet', component: WalletComponent, canActivate: [GuardService], outlet: 'contentOutlet' },
      { path: 'profile', component: ProfileComponent, canActivate: [GuardService], outlet: 'contentOutlet' },
      { path: 'transaction', component: TransactionComponent, canActivate: [GuardService], outlet: 'contentOutlet' },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
