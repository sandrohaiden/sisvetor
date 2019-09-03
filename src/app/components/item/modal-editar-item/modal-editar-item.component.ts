import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../../item/item.component';
import { ItemService } from 'src/app/services/item/item.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import Subitem from 'src/app/models/Subitem';
import { SubitemService } from 'src/app/services/subitem/subitem.service';
import Item from 'src/app/models/Item';

@Component({
  selector: 'app-modal-editar-item',
  templateUrl: './modal-editar-item.component.html',
  styleUrls: ['./modal-editar-item.component.css']
})
export class ModalEditarItemComponent implements OnInit {

  form: FormGroup
  selecteds: Subitem[];
  subitens: Subitem[]=[];
  subitensFiltrados: Subitem[];

  constructor(
    public dialogRef: MatDialogRef<ModalEditarItemComponent>, private subitemService: SubitemService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private itemService: ItemService, private fb: FormBuilder,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.getSubitens();
    this.form = this.fb.group({
      nome: this.fb.control(this.data.selected.nome),
    })
  }

  getSubitens() {
    this.subitemService.getAll()
    .subscribe((data: Item[]) => {
      this.subitens = data;
      this.buildValues(this.data.selected.subitens);
    });
  }

  buildValues(data: Subitem[]) {
    this.subitensFiltrados = [];
    for(let item of this.subitens){
      let boo = false
      for(let i of data){
        if (item.id === i.id){
          boo = true
        }
      }
      console.log(boo);
      if(!boo){
        this.subitensFiltrados.push(item);
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    this.data.selected.nome = this.form.value.nome;
    this.itemService.put(this.data.selected)
    .subscribe((data: Subitem[]) => {
      console.log(data);
      this.snack.open('Alterações salvas Com Sucesso!', '',{
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['green-snackbar']
      })
    })
    this.dialogRef.close();
  }

  adiciona(index: number) {
    this.data.selected.subitens.push(this.subitensFiltrados[index]);
    this.subitensFiltrados.splice(index, 1);
  }

  retorna(index: number) {
    this.subitensFiltrados.push(this.data.selected.subitens[index])
    this.data.selected.subitens.splice(index, 1);
  }

}
