import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {BookmarksGuard} from './bookmarks/bookmarks.guard';
import {BookmarksComponent} from './bookmarks/bookmarks.component';

const routes: Routes = [
  {
    path: 'bookmarks',
    canActivate: [BookmarksGuard],
    component: BookmarksComponent
  },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
