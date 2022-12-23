import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public productForm!: FormGroup;
  public product!: Product;
  public productEditId: string = '';
  public categories!: Category[];
  public pageTitle = "Cadastro de Produtos";

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadListOfProductsCategories();
    this.buildForm();
    const product = this.getProductData();
    if (product){
      this.loadEditForm(product);
      this.pageTitle = "Edição de Produto";
    };
  }

  loadListOfProductsCategories(): void {
    this.categories = this.productsService.getProductCategories();
  }

  private buildForm(): void {
    this.productForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        ]),
      category: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        ]),
      value: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required)
    });
  }

  public getErrorMessage(field: string): string {
    if (this.productForm.get(field)?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (this.productForm.get(field)?.hasError('minlength')) {
      return 'Mínimo 3 caracteres';
    }
    return 'Preenchimento inválido';
  }

  public submitForm(): void {
    this.product = this.productForm.getRawValue();
    if (!this.productEditId) {
      this.productsService.saveProduct(this.product);
    } else {
      this.productsService.updateProduct(this.product);
    }
    this.router.navigate(['/products']);
  }

  public cancelForm(): void {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }

  private getProductData(): Product | undefined {
    this.productEditId = this.route.snapshot.params['id'];
    if (!this.productEditId) {
      return;
    }
    return this.productsService.getProductById(this.productEditId);
  }

  private loadEditForm(prod: Product): void {
    this.productForm.patchValue(prod);
  }

}
