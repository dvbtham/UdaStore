import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ProductService } from '../../../services/catalog/product.service';
import { DataTableBase } from '../../../data-table';
import { ProductForm } from '../../../models/catalog/product';
import { DeleteSuccessMessage } from '../../../services/app-service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends DataTableBase {

  products: any[] = [];
  constructor(private productService: ProductService, private toastyService: ToastyService) {
    super();
    this.fetchData();
  }

  fetchData() {
    this.productService.getAll().subscribe((products: any[]) => {
        this.products = products.sort((l, r): number => {
            if (l.name < r.name) return -1;
            if (l.name > r.name) return 1;
            return 0;
        });
      this.initializeTable(products);
    });
  }

  filter(query: string) {
    let filteredData = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredData);
  }

  isPublishedToggle(id: number) {
    this.productService.updateIdOnly(id).subscribe(() => {
      this.fetchData();
    });
  }

  delete(id: number) {
    if (!confirm('Bạn có chắc chắn xóa?')) return;

    this.productService.delete(id).subscribe(res => {
      this.toastyService.success(DeleteSuccessMessage);
      this.fetchData();
    });

  }
}

