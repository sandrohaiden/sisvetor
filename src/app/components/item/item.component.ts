import { Component, OnInit, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ItemService } from '../../services/item/item.service';
import Item from '../../models/Item';
import { SubitemService } from '../../services/subitem/subitem.service';
import Subitem from '../../models/Subitem';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

export interface DialogData {
  id: number;
  form: FormGroup;
  selecteds: Subitem[];
  subitens: Subitem[];
}

var selectedItem: Item;
var subitens: Subitem[];
var selSubitens: Subitem[];
var subitensFiltrados: Subitem[];
var itemForm = new FormGroup({
  nome: new FormControl(''),
})

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

  itens: Item[];
  dataSource: any;
  nome: string;

  constructor(private itemService: ItemService, private subitemService: SubitemService,
              private dialog: MatDialog, private fb: FormBuilder) { }
  
  displayedColumns: string[] = ['position', 'name', 'subitens', 'actions'];
  expandedElement: Item | null;

  
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
      subitens = data;
      console.log(subitens);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModalCadastrar(): void {
    const dialogRef = this.dialog.open(DialogCadastrarItem, {
      width: '50%',
      data: {nome: this.nome, subitens: subitens, selSubitens: selSubitens, form: itemForm}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getItens(); 
    });
  }

  buildValues(data: Subitem[]) {
    subitensFiltrados = [];
    for(let item of subitens){
      let boo = false
      for(let i of data){
        if (item.id === i.id){
          boo = true
        }
      }
      if(!boo){
        subitensFiltrados.push(item);
      }
    }
  }

  openModalEditar(data: Item): void {
    selectedItem = data;
    this.buildValues(data.subitens)
    itemForm = this.fb.group({
      nome: this.fb.control(data.nome),
    })
    console.log(itemForm.controls);
    const dialogRef = this.dialog.open(DialogEditarItem, {
      width: '80%',
      data: {subitens: subitensFiltrados, selecteds: data.subitens, form: itemForm}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getItens();
      this.getSubitens(); 
    });
  }

  openModalDeletar(data: any): void {
    const dialogRef = this.dialog.open(DialogDeletarItem, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getItens(); 
    });
  }
  
}

@Component({
  selector: 'modal-cadastro',
  templateUrl: 'modalCadastro.html',
})
export class DialogCadastrarItem {

  constructor(
    public dialogRef: MatDialogRef<DialogCadastrarItem>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private itemService: ItemService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data: {}): void {
    console.log(data);
    this.itemService.post(data)
    .subscribe((data: Subitem[]) => {
      console.log(this.data);
    })
    this.dialogRef.close();
  }

}

@Component({
  selector: 'modal-editar',
  templateUrl: 'modalEditar.html',
})
export class DialogEditarItem {

  constructor(
    public dialogRef: MatDialogRef<DialogEditarItem>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private itemService: ItemService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    console.log('$$$$$$$$$$$$$$$$$');
    selectedItem.nome = itemForm.value.nome;
    this.itemService.put(selectedItem)
    .subscribe((data: Subitem[]) => {
      console.log(data);
    })
    this.dialogRef.close();
  }

  adiciona(index: number) {
    let sub: Subitem; 
    sub = subitensFiltrados[index]
    selectedItem.subitens.push(sub);
    subitensFiltrados.splice(index, 1);
  }

  retorna(index: number) {
    subitensFiltrados.push(selectedItem.subitens[index])
    selectedItem.subitens.splice(index, 1);
  }

}


@Component({
  selector: 'modal-cadastro',
  templateUrl: 'modalDeletar.html',
})
export class DialogDeletarItem {

  constructor(
    public dialogRef: MatDialogRef<DialogDeletarItem>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private itemService: ItemService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data: {}): void {
    console.log(data);
    this.itemService.delete(data)
    .subscribe((data: any) => {
      console.log(this.data);
    })
    this.dialogRef.close();
  }

}

