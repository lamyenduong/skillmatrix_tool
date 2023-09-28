import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { DetailFormComponent } from './pages/detail-form/detail-form.component';
import { AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'detail/:form_id', component: DetailFormComponent },
  { path: 'create', component: CreateFormComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
