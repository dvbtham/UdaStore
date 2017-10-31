import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductAttributes } from '../../../models/catalog/product-attributes';
import { DataTableResource, DataTable, DataTableTranslations } from 'data-table-angular-4-bootstrap-3/src';
import { ProductAttributesService } from '../../../services/catalog/product-attributes.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.css']
})
export class ProductAttributesComponent {

  productAttributes: ProductAttributes[] = [];
  tableResource = new DataTableResource(this.productAttributes);
  itemCount = 0;
  items: ProductAttributes[] = [];

  @ViewChild(DataTable) table;
  constructor(private productAttributesService: ProductAttributesService,
    private toastyService: ToastyService) {

    this.productAttributesService.getAll().subscribe(atrributeGroup => {
      this.productAttributes = atrributeGroup;
      this.initializeTable(atrributeGroup);
    });

  }

  private initializeTable(atrributeGroup: ProductAttributes[]) {
    this.tableResource = new DataTableResource(atrributeGroup);

    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);

    this.tableResource.count().then(count => this.itemCount = count);
  }

  filter(query: string) {
    let filtered = (query) ?
      this.productAttributes.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.productAttributes;

    this.initializeTable(filtered);
  }

  reload(params) {
    this.tableResource.query(params).then(items => this.items = items);
  }

  cellColor(car) {
    return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
  };

  
  delete(id: number) {
    if (!confirm('Bạn có chắc chắn xóa?')) return;

    this.productAttributesService.delete(id).subscribe(res => {
      this.toastyService.success({
        title: 'Xóa thành công',
        msg: 'Dữ liệu đã được xóa.',
        theme: 'material',
        timeout: 5000,
        showClose: true
      });
      this.initializeTable(this.items);
    });

  }

  translations = <DataTableTranslations>{
    indexColumn: 'Thứ tự',
    expandColumn: 'Mô tả',
    selectColumn: 'Ô chọn',
    paginationLimit: 'Tối đa',
    paginationRange: 'Kết quả'
  };

}
