import { Component, OnInit, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ItemService } from '../../services/item/item.service';
import Item from '../../models/Item';
import { SubitemService } from '../../services/subitem/subitem.service';
import Subitem from '../../models/Subitem';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ModalCadastrarItemComponent } from './modal-cadastrar-item/modal-cadastrar-item.component';
import { ModalEditarItemComponent } from './modal-editar-item/modal-editar-item.component';
import { ModalDeletarItemComponent } from './modal-deletar-item/modal-deletar-item.component';

export interface DialogData {
  id: number;
  form: FormGroup;
  selecteds: Subitem[];
  subitens: Subitem[];
  nome: string;
  selected: Item;
}

var selectedItem: Item;
var subitens: Subitem[];
var selSubitens: Subitem[] = [];
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

  press(str: string){
    if(str.length === 0){
      this.getItens();
    }
  }

  findByNome(){
    this.itemService.findByNome(this.nome)
    .subscribe((data: Item[]) => {
      this.itens = data;
      this.dataSource = new MatTableDataSource(this.itens);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModalCadastrar(): void {
    const dialogRef = this.dialog.open(ModalCadastrarItemComponent, {
      width: '50%',
      data: {nome: this.nome, subitens: subitensFiltrados, selecteds: selSubitens, form: itemForm}
    });

    dialogRef.afterClosed().subscribe(result => {
      selSubitens = [];
      this.getItens(); 
    });
  }



  openModalEditar(data: Item): void {
    selectedItem = data;
    itemForm = this.fb.group({
      nome: this.fb.control(data.nome),
    })
    console.log(itemForm.controls);
    const dialogRef = this.dialog.open(ModalEditarItemComponent, {
      width: '80%',
      data: {selected: selectedItem}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getItens();
      this.getSubitens(); 
    });
  }

  openModalDeletar(data: Item): void {
    const dialogRef = this.dialog.open(ModalDeletarItemComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getItens(); 
    });
  }
  
}
