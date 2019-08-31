import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SubitemService } from '../../services/subitem/subitem.service';
import Subitem from '../../models/Subitem';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-subitem',
  templateUrl: './subitem.component.html',
  styleUrls: ['./subitem.component.css']
})

export class SubitemComponent implements OnInit {

  subitens: Subitem[];
  nome: string;

  constructor(private subitemService: SubitemService, private dialog: MatDialog) { }

  ngOnInit(){
    this.subitemService.getAll()
    .subscribe((data: Subitem[]) => {
      this.subitens = data;
      console.log(this.subitens);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {nome: this.nome}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.subitemService.getAll()
      .subscribe((data: Subitem[]) => {
        this.subitens = data;
        console.log(this.subitens);
      })
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.html',
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
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
