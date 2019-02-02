import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProddisplayComponent} from './comp/proddisplay/proddisplay.component';
import {ProddetailsComponent} from './comp/proddisplay/proddetails/proddetails.component';
import {PassComponent} from './comp/pass/pass.component';
import {LoginComponent} from './comp/login/login.component';

const routes: Routes = [
  { path: 'display', component: ProddisplayComponent },
  { path: 'login', component: LoginComponent },
  { path: 'prod-details/:id', component: ProddetailsComponent },
  { path: 'add-product', component: PassComponent },
  { path: '', redirectTo: '/display', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
