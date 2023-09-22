// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './login/login.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { CreateStep1Component } from './pages/create-form/components/create-step1/create-step1.component';
import { CreateStep2Component } from './pages/create-form/components/create-step2/create-step2.component';
import { CreateStep3Component } from './pages/create-form/components/create-step3/create-step3.component';
import { DetailFormComponent } from './pages/detail-form/detail-form.component';
// Primeng
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { StepsModule } from 'primeng/steps';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { PanelModule } from 'primeng/panel';
import { SplitButtonModule } from 'primeng/splitbutton';
//Service
import { TextService } from './services/text-service.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    ErrorComponent,
    CreateFormComponent,
    CreateStep1Component,
    CreateStep2Component,
    CreateStep3Component,
    DetailFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RippleModule,
    TabViewModule,
    PaginatorModule,
    TableModule,
    ToastModule,
    DialogModule,
    CardModule,
    MenuModule,
    MenubarModule,
    HttpClientModule,
    StepsModule,
    AvatarModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    CalendarModule,
    ChipModule,
    InputTextareaModule,
    PanelModule,
    SplitButtonModule
  ],
  providers: [MessageService, TextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
