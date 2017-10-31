import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableTranslations, DataTableResource, DataTable } from 'data-table-angular-4-bootstrap-3/src';
import { ProductTemplatesService } from '../../../services/catalog/product-templates.service';
import { ToastyService } from 'ng2-toasty';
import { KeyValue } from '../../../models/catalog/key-value';

@Component({
  selector: 'app-product-templates',
  templateUrl: './product-templates.component.html',
  styleUrls: ['./product-templates.component.css']
})
export class ProductTemplatesComponent {

  templates: KeyValue[] = [];
  tableResource = new DataTableResource(this.templates);
  itemCount = 0;
  items: KeyValue[] = [];

  @ViewChild(DataTable) table;
  constructor(private templatesService: ProductTemplatesService,
    private toastyService: ToastyService) {

    this.templatesService.getAll().subscribe(res => {
      this.templates = res;
      this.initializeTable(res);
    });

  }

  private initializeTable(templates: KeyValue[]) {
    this.tableResource = new DataTableResource(templates);

    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);

    this.tableResource.count().then(count => this.itemCount = count);
  }

  filter(query: string) {
    let filtered = (query) ?
      this.templates.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.templates;

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

    this.templatesService.delete(id).subscribe(res => {
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
