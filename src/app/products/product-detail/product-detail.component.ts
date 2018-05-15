import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISupplier } from '../../suppliers/isupplier';
import { ICategory } from '../../catogories/icategory';
import { IProduct } from '../iproduct';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CartState } from '../CartState';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<IProduct>;
  product: IProduct;
  category: ICategory;
  supplier: ISupplier;
  // edition = false;

  private cart = new BehaviorSubject<any>(this.product$);
  products: IProduct[];
  private subscription: Subscription;
  private cartSubject = new Subject<CartState>();
  CartState = this.cartSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.product$ = this.route.paramMap.switchMap((params: ParamMap) =>
      this.productService.getProduct(params.get('id'))
    );
    this.product$.subscribe(product => console.log(product));
    this.subscription = this
            .productService
            .CartState
            .subscribe((state: CartState) => {
                this.products = state.products;
                console.log(this.products);
            });
  }

  goBackToList() {
    this.router.navigate(['products']);
  }

  AddProduct(product) {
    product.added = true;
    this.productService.addProduct(product);
  }
  RemoveProduct(product) {
    product.added = false;
    this.productService.removeProduct(product.id);
  }

  addToCart(product) {
    sessionStorage.setItem('cart', JSON.stringify(product));
    this.productService.addProduct(product);
  }
}
