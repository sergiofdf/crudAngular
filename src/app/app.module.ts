import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './users/components/create-user/create-user.component';
import { ListComponent } from './users/components/list/list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './shared/dialog/dialog.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/components/products-list/products-list.component';
import { CreateProductComponent } from './products/components/create-product/create-product.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CreateUserComponent,
    NotFoundComponent,
    ListComponent,
    DialogComponent,
    ProductsComponent,
    ProductsListComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    material,
    ReactiveFormsModule
  ],
  providers: [provideNgxMask(), { provide: LOCALE_ID, useValue: 'pt' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
