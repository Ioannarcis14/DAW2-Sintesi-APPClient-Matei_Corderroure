import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishPage } from './dish.page';
import {AuthGuard} from "../../../../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: DishPage,
    canActivate: [AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DishPageRoutingModule {}
