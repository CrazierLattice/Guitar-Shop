import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  constructor(
    public cart: CartService,
    public data: DataService,
    public admin: AdminService
  ) { }
  public addItemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    picture: new FormControl('', [Validators.required]),
  });

  public addNewProduct(value) {
    this.admin.addProduct(value)
    if (!this.data.addProductMessage?.error) {
      this.addItemForm.reset()
      this.addItemForm.markAsUntouched()
    }
  }

  @Input() public drawer: any;
  ngOnInit(): void {
  }
}
