import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import { SubitemService } from '../../services/subitem/subitem.service';
import Subitem from '../../models/Subitem';

export interface DialogData {
  nome: string
}

@Component({
  selector: 'app-subitem',
  templateUrl: './subitem.component.html',
  styleUrls: ['./subitem.component.css']
})

export class SubitemComponent implements OnInit {

  subitens: Subitem[];
  nome: string;
  dataSource: any;
  displayedColumns: string[] = ['position', 'name', 'actions'];

  constructor(private subitemService: SubitemService, private dialog: MatDialog) { }

  async ngOnInit(){
    this.getSubitens(); 
  }

  getSubitens() {
    this.subitemService.getAll()
    .subscribe((data: Subitem[]) => {
      this.subitens = data;
      console.log(this.subitens);
      this.dataSource = new MatTableDataSource(this.subitens);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModalCadastrar(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {nome: this.nome}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubitens(); 
    });
  }

  openModalEditar(data: any): void {
    const dialogRef = this.dialog.open(DialogEditarSubitem, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubitens(); 
    });
  }

  openModalDeletar(data: any): void {
    const dialogRef = this.dialog.open(DialogDeletarSubitem, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubitens(); 
    });
  }

}

@Component({
  selector: 'modal-cadastro',
  templateUrl: 'modalCadastro.html',
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

@Component({
  selector: 'modal-editar',
  templateUrl: 'modalEditar.html',
})
export class DialogEditarSubitem {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private subitemService: SubitemService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data: {}): void {
    console.log(data);
    this.subitemService.put(data)
    .subscribe((data: Subitem[]) => {
      console.log(this.data);
    })
    this.dialogRef.close();
  }

}

@Component({
  selector: 'modal-cadastro',
  templateUrl: 'modalDeletar.html',
})
export class DialogDeletarSubitem {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private subitemService: SubitemService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data: {}): void {
    console.log(data);
    this.subitemService.delete(data)
    .subscribe((data: any) => {
      console.log(this.data);
    })
    this.dialogRef.close();
  }

}
