import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../../subitem/subitem.component';
import { ItemService } from 'src/app/services/item/item.service';
import Subitem from 'src/app/models/Subitem';
import { SubitemService } from 'src/app/services/subitem/subitem.service';
import Item from 'src/app/models/Item';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-cadastrar-item',
  templateUrl: './modal-cadastrar-item.component.html',
  styleUrls: ['./modal-cadastrar-item.component.css']
})
export class ModalCadastrarItemComponent implements OnInit {

  subitens: Subitem[] = [];
  selecteds: Subitem[] = [];
  form =new FormGroup({
    nome: new FormControl(''),
  });
  sub: Subitem;

  constructor(
    public dialogRef: MatDialogRef<ModalCadastrarItemComponent>, private subitemService: SubitemService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private itemService: ItemService,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.getSubitens();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adiciona(index: number) {
    this.selecteds.push(this.subitens[index]);
    this.subitens.splice(index,1);
  }

  getSubitens() {
    this.subitemService.getAll()
    .subscribe((data: Item[]) => {
      this.subitens = data;
      console.log(this.subitens);
    });
  }

  retorna(index: number) {
    this.subitens.push(this.selecteds[index])
    this.selecteds.splice(index, 1);
  }

  onClick(data: Item): void {
    console.log(data);
    data.subitens = this.selecteds
    this.itemService.post(data)
    .subscribe((data: Subitem[]) => {
      console.log(this.data);
      this.snack.open('Item Cadastrado Com Sucesso!', '',{
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['green-snackbar']
      })
    }, (err: HttpErrorResponse) => {
      this.snack.open('Algo deu Errado!', '',{
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar']
      })
    })
    this.dialogRef.close();
  }

}
