import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'value', 'quantity', 'delete'];
  dataSource!: Product[];
  clickedRows = new Set<Product>();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProductList();
    console.log(this.dataSource);
  }

  loadProductList(): void {
    this.dataSource = this.productsService.listProducts();
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
