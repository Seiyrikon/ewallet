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
import { AddWalletComponent } from './component/dashboard/wallet/add-wallet/add-wallet.component';
import { ViewWalletComponent } from './component/dashboard/wallet/view-wallet/view-wallet.component';
import { DepositComponent } from './component/dashboard/wallet/view-wallet/deposit/deposit.component';
import { WithdrawComponent } from './component/dashboard/wallet/view-wallet/withdraw/withdraw.component';
import { RegisterComponent } from './component/register/register.component';
import { AddWalletFormGuard } from './service/wallet/guard/add-wallet-form.guard';
import { AddDepositFormGuard } from './service/deposit/guard/add-deposit-form.guard';
import { AddWithdrawFormGuard } from './service/withdraw/guard/add-withdraw-form.guard';
import { EditProfileFormGuard } from './service/profile/guard/edit-profile-form.guard';
import { FriendComponent } from './component/dashboard/friend/friend.component';
import { RequestComponent } from './component/dashboard/request/request.component';
import { ChatComponent } from './component/dashboard/chat/chat/chat.component';
import { ChatSessionComponent } from './component/dashboard/chat-session/chat-session/chat-session.component';
import { SearchComponent } from './component/dashboard/search/search/search.component';
import { TransferFundComponent } from './component/dashboard/wallet/transfer-fund/transfer-fund.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardService],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        outlet: 'contentOutlet'
      }, // Redirect to 'main-content' by default
      {
        path: 'wallet/view/:walletId/deposit',
        component: DepositComponent,
        canActivate: [GuardService],
        canDeactivate: [AddDepositFormGuard],
        outlet: 'contentOutlet'
      },
      {
        path: 'wallet/view/:walletId/withdraw',
        component: WithdrawComponent,
        canActivate: [GuardService],
        canDeactivate: [AddWithdrawFormGuard],
        outlet: 'contentOutlet',
        data: { formType: 'withdraw' }
      },
      {
        path: 'wallet/view/:walletId',
        component: ViewWalletComponent,
        canActivate: [GuardService],
        outlet: 'contentOutlet'
      },
      {
        path: 'wallet/add',
        component: AddWalletComponent,
        canActivate: [GuardService],
        canDeactivate: [AddWalletFormGuard],
        outlet: 'contentOutlet'
      },
      {
        path: 'wallet/transfer',
        component: TransferFundComponent,
        canActivate: [GuardService],
        outlet: 'contentOutlet'
      },
      //top nav
      {
        path: 'home',
        component: MainContentComponent,
        canActivate: [GuardService],
        outlet: 'contentOutlet'
      },
      {
        path: 'wallet',
        component: WalletComponent,
        canActivate: [GuardService],
        outlet: 'contentOutlet'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [GuardService],
        canDeactivate: [EditProfileFormGuard],
        outlet: 'contentOutlet'
      },
      {
        path: 'transaction',
        component: TransactionComponent,
        canActivate: [GuardService],
        outlet: 'contentOutlet'
      },
      //top nav

      //side nav
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [GuardService],
        outlet: 'contentOutlet'
      },
      {
        path: 'friend',
        component: FriendComponent,
        canActivate: [GuardService],
        outlet: 'contentOutlet'
      },
      {
        path: 'request',
        component: RequestComponent,
        canActivate: [GuardService],
        outlet: 'contentOutlet'
      },
      {
        path: 'chat/session/:recipient_id',
        component: ChatSessionComponent,
        canActivate: [GuardService],
        outlet: 'contentOutlet'
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [GuardService],
        outlet: 'contentOutlet'
      },
      //side nav
      {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
      },
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
