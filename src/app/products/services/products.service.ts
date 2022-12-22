import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public dialog: MatDialog) { }

  public getProductCategories(): Category[]{
    return [
      { id: '1', name: 'Celulares' },
      { id: '2', name: 'Eletrodomésticos' },
      { id: '3', name: 'Vestuários' },
      { id: '4', name: 'Alimentos' },
      { id: '5', name: 'Equipamentos Esportivos' }
    ];
  }

  public listProducts(): Product[] {
    return JSON.parse(localStorage.getItem('PRODUCTS') || '[]');
  }

  public saveProduct(product: Product): void {
    const products = this.listProducts();
    if(products.some(p => p.name.toLowerCase().trim() === product.name.toLowerCase().trim())){
      this.openProductErrorDialog('500ms', '500ms');
      return;
    }
    const prodId = products.length + 1;
    product = {
      ...product,
      id: prodId.toString(),
    };

    products.push(product);
    localStorage.setItem('PRODUCTS', JSON.stringify(products));
  }

  public getProductById(productId: string): Product {
    const product = this.listProducts();
    return product.find(product => product.id === productId) as Product;
  }

  public updateProduct(product: Product): boolean {
    debugger
    const products = this.listProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (!index && index != 0) return false;
    products[index] = product;
    localStorage.setItem('PRODUCTS', JSON.stringify(products));
    return true;
  }

  deleteProduct(productId: string): void {
    const products = this.listProducts();
    const indexToRemove = products.findIndex( product => product.id === productId);
    if(indexToRemove < 0 ) {
      return
    }
    products.splice(indexToRemove, 1);
    localStorage.setItem('PRODUCTS', JSON.stringify(products));
  }


  public openProductErrorDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Falha no cadastro',
        text: 'Este produto já está cadastrado no sistema!',
        button1: '',
        button2: 'Fechar'
      },
    });
  }


}
