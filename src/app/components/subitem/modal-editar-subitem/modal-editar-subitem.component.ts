import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../subitem.component';
import Subitem from 'src/app/models/Subitem';
import { SubitemService } from 'src/app/services/subitem/subitem.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-editar-subitem',
  templateUrl: './modal-editar-subitem.component.html',
  styleUrls: ['./modal-editar-subitem.component.css']
})
export class ModalEditarSubitemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalEditarSubitemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private subitemService: SubitemService,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data: {}): void {
    console.log(data);
    this.subitemService.put(data)
    .subscribe((data: Subitem[]) => {
      console.log(this.data);
      this.snack.open('Alteração Salva Com Sucesso!', '',{
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
