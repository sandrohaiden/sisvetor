import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SubitemService } from 'src/app/services/subitem/subitem.service';
import { DialogData } from '../subitem.component';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-deletar-subitem',
  templateUrl: './modal-deletar-subitem.component.html',
  styleUrls: ['./modal-deletar-subitem.component.css']
})
export class ModalDeletarSubitemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDeletarSubitemComponent>,
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
    this.subitemService.delete(data)
    .subscribe((data: any) => {
      console.log(this.data);
      this.snack.open('Subitem Excluído Com Sucesso!', '',{
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
