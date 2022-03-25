import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './data.service';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private data: DataService,
    private http: HttpClient,
    private dialog: MatDialog,
    private main: MainService
  ) { }

  public addProduct(body) {
    this.http
      .post('http://localhost:5000/admin/new-product', body, {
        headers: {
          'Content-Type': 'application/json',
          'xx-auth': this.data.token,
        },
      })
      .subscribe(
        (res: any) => {
          this.data.addProductMessage = res;
          this.main.getAllGuitars();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public editProduct(productId, name, category, price, picture) {
    this.http
      .put(
        `http://localhost:5000/admin/edit-product/${productId}`,
        {
          name,
          category,
          price,
          picture,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'xx-auth': this.data.token,
          },
        }
      )
      .subscribe(
        (res) => {

          this.main.getAllGuitars();
          this.dialog.closeAll();
        },
        (err) => {
          this.data.editProductError = err.error;
          console.log(err);
        }
      );
  }
}
