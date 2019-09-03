import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../../item/item.component';
import { ItemService } from 'src/app/services/item/item.service';
import Item from 'src/app/models/Item';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-deletar-item',
  templateUrl: './modal-deletar-item.component.html',
  styleUrls: ['./modal-deletar-item.component.css']
})
export class ModalDeletarItemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDeletarItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private itemService: ItemService,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data: Item): void {
    console.log(data);
    this.itemService.delete(data)
    .subscribe((data: any) => {
      console.log(this.data);
      this.snack.open('Item Excluído Com Sucesso!', '',{
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
