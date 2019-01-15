import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProddisplayComponent} from './comp/proddisplay/proddisplay.component';
import {ProddetailsComponent} from './comp/proddisplay/proddetails/proddetails.component';

const routes: Routes = [
  {path: 'display', component: ProddisplayComponent},
  {path: 'proddetails/:title', component: ProddetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
