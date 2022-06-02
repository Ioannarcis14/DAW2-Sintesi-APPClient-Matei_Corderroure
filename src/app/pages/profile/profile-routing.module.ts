import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    canActivate: [AuthGuard]

  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
