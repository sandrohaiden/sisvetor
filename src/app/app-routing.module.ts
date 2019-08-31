import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubitemComponent } from './components/subitem/subitem.component';
import { ItemComponent } from './components/item/item.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'itens',
    pathMatch: 'full'
  },
  {
    path: 'itens',
    component: ItemComponent,
  },
  {
    path: 'subitens',
    component: SubitemComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
