import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource, DataTableTranslations, DataTable } from 'data-table-angular-4-bootstrap-3/src';
import { ProductOptionsService } from '../../../services/catalog/product-options.service';
import { ToastyService } from 'ng2-toasty';
import { KeyValue } from '../../../models/catalog/key-value';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.css']
})
export class ProductOptionsComponent {

  productOptions: KeyValue[] = [];
  tableResource = new DataTableResource(this.productOptions);
  itemCount = 0;
  items: KeyValue[] = [];

  @ViewChild(DataTable) table;
  constructor(private attributeGroupService: ProductOptionsService,
    private toastyService: ToastyService) {

    this.attributeGroupService.getAll().subscribe(atrributeGroup => {
      this.productOptions = atrributeGroup;
      this.initializeTable(atrributeGroup);
    });

  }

  private initializeTable(atrributeGroup: KeyValue[]) {
    this.tableResource = new DataTableResource(atrributeGroup);

    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);

    this.tableResource.count().then(count => this.itemCount = count);
  }

  filter(query: string) {
    let filteredAtrributeGroup = (query) ?
      this.productOptions.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.productOptions;

    this.initializeTable(filteredAtrributeGroup);
  }

  reload(params) {
    this.tableResource.query(params).then(items => this.items = items);
  }

  cellColor(car) {
    return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
  };

  
  delete(id: number) {
    if (!confirm('Bạn có chắc chắn xóa?')) return;

    this.attributeGroupService.delete(id).subscribe(res => {
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
