import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import MessageInterface from '../interfaces/message.interface';
import LastActionInterface from '../interfaces/last-action.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, public data: DataService) { }
  public cartErrorMessage: MessageInterface;
  public getItemsInCart(id) {
    this.http.get(`http://localhost:5000/cart/products/${id}`, {
      headers: {
        'xx-auth': localStorage?.token
      }
    }).subscribe(
      (res: any) => {
        this.data.productsInCart = res.products;
        this.data.totalPrice = res.totalPrice;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public addItemToCart(productId, amount) {

    return this.http.post(
      `http://localhost:5000/cart/add/${this.data.user._id}/${productId}`,
      {
        amount,
      },
      {
        headers: { 'Content-Type': 'application/json', 'xx-auth': this.data.token },
      }
    );
  }

  public deleteItemFromCart(productId) {
    this.http
      .delete(
        `http://localhost:5000/cart/delete/${this.data.user._id}/${productId}`
        , { headers: { 'xx-auth': this.data.token } })
      .subscribe(
        (res: any) => {
          this.data.totalPrice = res.totalPrice;
          this.data.productsInCart = res.cart;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public deleteAllItemsFromCart() {
    this.http
      .delete(`http://localhost:5000/cart/delete-all/${this.data.cartData._id}`, { headers: { 'xx-auth': this.data.token } })
      .subscribe(
        (res: any) => {
          this.data.productsInCart = res.cart;
          this.data.totalPrice = res.totalPrice;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public createNewCart(userId) {
    this.http
      .post(
        `http://localhost:5000/cart/newcart/${userId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'xx-auth': this.data.token,
          },
        }
      )
      .subscribe(
        (res: any) => {
          this.data.cartData = res.cart;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public getExistingCart(userId) {
    this.http
      .post(
        `http://localhost:5000/cart/existing-cart/${userId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'xx-auth': this.data.token,
          },
        }
      )
      .subscribe(
        (res: any) => {
          this.data.cartData = res.cart;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public getLatestUserActionData(userId) {
    this.http
      .get(`http://localhost:5000/order/latest-action/${userId}`, {
        headers: {
          'xx-auth': this.data.token,
        },
      })
      .subscribe(
        (res) => {
          this.data.lastUserAction = res as LastActionInterface;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
