import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubitemComponent } from './components/subitem/subitem.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'itens',
    pathMatch: 'full'
  },
  {
    path: 'itens',
    component: SubitemComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
