// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './login/login.component';
// Primeng
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { StepsModule } from 'primeng/steps';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
//Service
import { TextService } from './services/text-service.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FormComponent,
    SearchComponent,
    LoginComponent,
    ErrorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    CalendarModule
  ],
  providers: [MessageService, TextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
