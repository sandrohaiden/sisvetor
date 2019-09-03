import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SubitemComponent } from './components/subitem/subitem.component';
import { SubitemService } from './services/subitem/subitem.service';
import { FormsModule }   from '@angular/forms';
import { ItemComponent} from './components/item/item.component';
import { ModalCadastrarSubitemComponent } from './components/subitem/modal-cadastrar-subitem/modal-cadastrar-subitem.component';
import { ModalEditarSubitemComponent } from './components/subitem/modal-editar-subitem/modal-editar-subitem.component';
import { ModalDeletarSubitemComponent } from './components/subitem/modal-deletar-subitem/modal-deletar-subitem.component';
import { ModalCadastrarItemComponent } from './components/item/modal-cadastrar-item/modal-cadastrar-item.component';
import { ModalEditarItemComponent } from './components/item/modal-editar-item/modal-editar-item.component';
import { ModalDeletarItemComponent } from './components/item/modal-deletar-item/modal-deletar-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SubitemComponent,
    ItemComponent,
    ModalCadastrarSubitemComponent,
    ModalEditarSubitemComponent,
    ModalDeletarSubitemComponent,
    ModalCadastrarItemComponent,
    ModalEditarItemComponent,
    ModalDeletarItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [SubitemService],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalCadastrarSubitemComponent,
    ModalEditarSubitemComponent,
    ModalDeletarSubitemComponent,
    ModalCadastrarItemComponent,
    ModalEditarItemComponent,
    ModalDeletarItemComponent,
  ]
})
export class AppModule { }
