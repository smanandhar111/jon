import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProddisplayComponent} from './comp/proddisplay/proddisplay.component';
import {ProddetailsComponent} from './comp/proddisplay/proddetails/proddetails.component';
import {PassComponent} from './comp/pass/pass.component';

const routes: Routes = [
  { path: 'display', component: ProddisplayComponent },
  { path: 'prod-details/:title', component: ProddetailsComponent },
  { path: 'add-product', component: PassComponent },
  { path: '', redirectTo: '/add-product', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
