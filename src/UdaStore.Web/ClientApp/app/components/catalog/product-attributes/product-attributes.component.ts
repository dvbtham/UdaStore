import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductAttributes } from '../../../models/catalog/product-attributes';
import { ProductAttributesService } from '../../../services/catalog/product-attributes.service';
import { ToastyService } from 'ng2-toasty';
import { DataTableBase } from '../../../data-table';
import { DeleteSuccessMessage } from '../../../services/app-service';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.css']
})
export class ProductAttributesComponent extends DataTableBase {

  productAttributes: ProductAttributes[] = [];

  constructor(private productAttributesService: ProductAttributesService,
    private toastyService: ToastyService) {
    super();
    this.fetchData();
  }

  fetchData() {
    this.productAttributesService.getAll().subscribe(atrributeGroup => {
      this.productAttributes = atrributeGroup;
      this.initializeTable(atrributeGroup);
    });
  }

  filter(query: string) {
    let filtered = (query) ?
      this.productAttributes.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.productAttributes;

    this.initializeTable(filtered);
  }

  delete(id: number) {
    if (!confirm('Bạn có chắc chắn xóa?')) return;

    this.productAttributesService.delete(id).subscribe(res => {
      this.toastyService.success(DeleteSuccessMessage);
      this.fetchData();
    });
  }
}
