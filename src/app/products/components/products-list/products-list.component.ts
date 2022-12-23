import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'value', 'quantity', 'delete'];
  productList!: Product[];
  dataSource = new MatTableDataSource(this.productList);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.productList);
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this.loadProductList();
  }

  loadProductList(): void {
    this.productList = this.productsService.listProducts();
  }

  editProduct(id: string): void {
    this.router.navigate(['/products/edit', id]);
  }

  public openDialog(
    event: any,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    productId: string
  ): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Excluir Cadastro de Produto',
        text: 'Tem certeza que deseja excluir este produto?',
        button1: 'Sim',
        button2: 'Cancelar'
      },
    });

    dialogRef.afterClosed().subscribe( data => {
      if(data === 'delete'){
        this.productsService.deleteProduct(productId);
        this.loadProductList();
      }
    });
  }

}
