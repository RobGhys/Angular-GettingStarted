import {Component, OnDestroy, OnInit} from "@angular/core";
import {IProduct} from "./product";
import { ProductService } from "./product.service";
import {Subscription} from "rxjs";

@Component({
  selector: "pm-products",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product List";

  imageWidth: number = 50;
  imageMargin: number = 2;

  showImage: boolean = false;
  errorMessage: string = "";
  sub!: Subscription;

  private _listFilter: string = "";

  /**************************************
   *        Getters and setters         *
   *************************************/

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log("In setter: " + value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  /**************************************
   *            Constructor             *
   *************************************/
  constructor(private productService: ProductService) {}

  /**************************************
   *           Init & Destroy           *
   *************************************/
  ngOnInit(): void {
    // Assign a value to the instance of Subscription object
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**************************************
   *              Methods               *
   *************************************/
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Product List: " + message;
  }

  private performFilter(filterBy: string): IProduct[] {
    // Convert filter to lower case
    filterBy = filterBy.toLowerCase();

    // Pass a product in the filter
    // Only keep product whose productName includes "filterBy"
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().includes(filterBy));
  }
}
