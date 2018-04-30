import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}