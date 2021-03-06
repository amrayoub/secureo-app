import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  providers: [UserService]
})
export class UsersModule { }
