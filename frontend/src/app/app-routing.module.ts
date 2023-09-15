import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { CreateStep1Component } from './pages/create-form/components/create-step1/create-step1.component';
import { CreateStep2Component } from './pages/create-form/components/create-step2/create-step2.component';
import { CreateStep3Component } from './pages/create-form/components/create-step3/create-step3.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'create', component: CreateFormComponent,
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
      { path: 'step1', component: CreateStep1Component },
      { path: 'step2', component: CreateStep2Component },
      { path: 'step3', component: CreateStep3Component }
    ]
  },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
