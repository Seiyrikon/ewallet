import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GuardService } from './service/guard/guard.service';
import { Error404Component } from './component/error404/error404.component';
import { WalletComponent } from './component/dashboard/wallet/wallet.component';
import { MainContentComponent } from './component/dashboard/main-content/main-content.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardService],
    children: [
      { path: '', redirectTo: 'main-content', pathMatch: 'full' }, // Redirect to 'main-content' by default
      { path: 'main-content', component: MainContentComponent, outlet: 'dashboardOutlet' },
      { path: 'wallet', component: WalletComponent, outlet: 'dashboardOutlet' },
      { path: '**', redirectTo: 'main-content', pathMatch: 'full' },
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
