import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductOptionsService } from '../../../services/catalog/product-options.service';
import { ToastyService } from 'ng2-toasty';
import { KeyValue } from '../../../models/catalog/key-value';
import { DataTableBase } from '../../../data-table';
import { DeleteSuccessMessage } from '../../../services/app-service';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.css']
})
export class ProductOptionsComponent extends DataTableBase {

  productOptions: KeyValue[] = [];

  constructor(private attributeGroupService: ProductOptionsService,
    private toastyService: ToastyService) {
    super();
    this.fetchData();
  }

  fetchData() {
    this.attributeGroupService.getAll().subscribe(atrributeGroup => {
      this.productOptions = atrributeGroup;
      this.initializeTable(atrributeGroup);
    });
  }

  filter(query: string) {
    let filteredAtrributeGroup = (query) ?
      this.productOptions.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.productOptions;

    this.initializeTable(filteredAtrributeGroup);
  }

  delete(id: number) {
    if (!confirm('Bạn có chắc chắn xóa?')) return;

    this.attributeGroupService.delete(id).subscribe(res => {
      this.toastyService.success(DeleteSuccessMessage);
      this.fetchData();
    });
  }
}
