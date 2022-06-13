import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import {AuthGuard} from "../../../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    canActivate: [AuthGuard]

  },
  {
    path: 'dish',
    loadChildren: () => import('./dish/dish.module').then( m => m.DishPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
