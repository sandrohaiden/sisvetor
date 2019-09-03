import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SubitemService } from '../../services/subitem/subitem.service';
import Subitem from '../../models/Subitem';
import { ModalCadastrarSubitemComponent } from './modal-cadastrar-subitem/modal-cadastrar-subitem.component';
import { ModalEditarSubitemComponent } from './modal-editar-subitem/modal-editar-subitem.component';
import { ModalDeletarSubitemComponent } from './modal-deletar-subitem/modal-deletar-subitem.component';

export interface DialogData {
  nome: string
}

@Component({
  selector: 'app-subitem',
  templateUrl: './subitem.component.html',
  styleUrls: ['./subitem.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class SubitemComponent implements OnInit {

  subitens: Subitem[];
  nome: string;
  dataSource: any;
  displayedColumns: string[] = ['position', 'name', 'actions'];

  constructor(private subitemService: SubitemService, private dialog: MatDialog) { }

  async ngOnInit(){
    this.getSubitens(); 
  }

  getSubitens() {
    this.subitemService.getAll()
    .subscribe((data: Subitem[]) => {
      this.subitens = data;
      console.log(this.subitens);
      this.dataSource = new MatTableDataSource(this.subitens);
    });
  }

  press(str: string){
    if(str.length === 0){
      this.getSubitens();
    }
  }

  findByNome(){
    this.subitemService.findByNome(this.nome)
    .subscribe((data: Subitem[]) => {
      this.subitens = data;
      this.dataSource = new MatTableDataSource(this.subitens);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModalCadastrar(): void {
    const dialogRef = this.dialog.open(ModalCadastrarSubitemComponent, {
      width: '250px',
      data: {nome: this.nome}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubitens(); 
    });
  }

  openModalEditar(data: any): void {
    const dialogRef = this.dialog.open(ModalEditarSubitemComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubitens(); 
    });
  }

  openModalDeletar(data: any): void {
    const dialogRef = this.dialog.open(ModalDeletarSubitemComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubitens(); 
    });
  }

}