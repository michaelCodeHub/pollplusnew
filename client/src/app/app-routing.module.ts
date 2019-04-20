import { SurveyQuestionsComponent } from './survey/survey-questions/survey-questions.component';

// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactDeleteComponent } from './contacts/contact-delete/contact-delete.component';
import { SurveyDetailsComponent } from './survey/survey-details/survey-details.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SurveyDeleteComponent } from './survey/survey-delete/survey-delete.component';
import { SurveyResultComponent } from './survey/survey-result/survey-result.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'about', component: AboutComponent, data: {title: 'About'}},
  {path: 'products', component: ProductsComponent, data: {title: 'Products'}},
  {path: 'services', component: ServicesComponent, data: {title: 'Services'}},
  {path: 'contact', component: ContactComponent, data: {title: 'Contact'}},

  {path: 'survey/add', component: SurveyDetailsComponent, data: {title: 'Add Survey'}, canActivate: [AuthGuard]},
  {path: 'survey/list', component: SurveyListComponent, data: {title: 'Active Survey'}},
  {path: 'survey/list/:username', component: SurveyListComponent, data: {title: 'My Survey'}},
  {path: 'survey/edit/:id', component: SurveyDetailsComponent, data: {title: 'Edit Survey'}},
  {path: 'survey/result/:id', component: SurveyResultComponent, data: {title: 'Edit Survey'}},
  {path: 'survey/questions/:id', component: SurveyQuestionsComponent, data: {title: 'Survey Questions'}},
  {path: 'survey/list/delete/:id', component: SurveyDeleteComponent, data: {title: 'Delete Contact'}, canActivate: [AuthGuard]},

  {path: 'contact/contact-list', component: ContactListComponent, data: {title: 'Contact List'}, canActivate: [AuthGuard]},
  {path: 'contact/contact-list/add', component: ContactDetailsComponent, data: {title: 'Add Contact'}, canActivate: [AuthGuard]},
  {path: 'contact/contact-list/edit/:id', component: ContactDetailsComponent, data: {title: 'Edit Contact'}, canActivate: [AuthGuard]},
  {path: 'contact/contact-list/delete/:id', component: ContactDeleteComponent, data: {title: 'Add Contact'}, canActivate: [AuthGuard]},

  {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  {path: 'editprofile', component: RegisterComponent, data: {title: 'Edit'}},
  {path: 'login', component: LoginComponent, data: {title: 'Register'}},
  {path: 'logout', redirectTo: '/login', pathMatch: 'full'},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
