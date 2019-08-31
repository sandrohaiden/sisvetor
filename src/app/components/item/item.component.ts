import { Component, OnInit, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ItemService } from '../../services/item/item.service';
import Item from '../../models/item';
import { SubitemService } from '../../services/subitem/subitem.service';
import Subitem from '../../models/Subitem';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

export interface DialogData {
  id: number;
  nome: string;
  subitens: [];
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ItemComponent implements OnInit {

  subitens: Subitem[];
  itens: Item[];
  dataSource: any;
  nome: string;
  selSubitens: Subitem[];

  constructor(private itemService: ItemService, private subitemService: SubitemService,
              private dialog: MatDialog) { }
  
  displayedColumns: string[] = ['position', 'name', 'subitens', 'actions'];
  expandedElement: Item | null;
  itemForm = new FormGroup({
    nomeItem: new FormControl(''),
    subitens: new FormControl([]),
  })
  
  ngOnInit() {
    this.getItens();
    this.getSubitens();
  }

  getItens() {
    this.itemService.getAll()
    .subscribe((data: Item[]) => {
      this.itens = data;
      console.log(this.itens);
      this.dataSource = new MatTableDataSource(this.itens);
    });
  }

  getSubitens() {
    this.subitemService.getAll()
    .subscribe((data: Item[]) => {
      this.subitens = data;
      console.log(this.subitens);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModalCadastrar(): void {
    const dialogRef = this.dialog.open(DialogCadastrarItem, {
      width: '50%',
      data: {nome: this.nome, subitens: this.subitens, selSubitens: this.selSubitens, form: this.itemForm}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubitens(); 
    });
  }

  /*openModalEditar(data: any): void {
    const dialogRef = this.dialog.open(DialogEditar, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubitens(); 
    });
  }

  openModalDeletar(data: any): void {
    const dialogRef = this.dialog.open(DialogDeletar, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubitens(); 
    });
  }*/
  
}

@Component({
  selector: 'modal-cadastro',
  templateUrl: 'modalCadastro.html',
})
export class DialogCadastrarItem {

  constructor(
    public dialogRef: MatDialogRef<DialogCadastrarItem>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private subitemService: SubitemService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data: {}): void {
    console.log(data);
    this.subitemService.post(data)
    .subscribe((data: Subitem[]) => {
      console.log(this.data);
    })
    this.dialogRef.close();
  }

}
