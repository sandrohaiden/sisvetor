import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DialogData } from '../subitem.component';
import { SubitemService } from 'src/app/services/subitem/subitem.service';
import Subitem from 'src/app/models/Subitem';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-cadastrar-subitem',
  templateUrl: './modal-cadastrar-subitem.component.html',
  styleUrls: ['./modal-cadastrar-subitem.component.css']
})
export class ModalCadastrarSubitemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalCadastrarSubitemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private subitemService: SubitemService,
    public snack: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data: {}): void {
    console.log(data);
    this.subitemService.post(data)
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
