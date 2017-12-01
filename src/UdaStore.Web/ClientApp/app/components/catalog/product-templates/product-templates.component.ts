import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductTemplatesService } from '../../../services/catalog/product-templates.service';
import { ToastyService } from 'ng2-toasty';
import { KeyValue } from '../../../models/catalog/key-value';
import { DataTableBase } from '../../../data-table';
import { DeleteSuccessMessage } from '../../../services/app-service';

@Component({
  selector: 'app-product-templates',
  templateUrl: './product-templates.component.html',
  styleUrls: ['./product-templates.component.css']
})
export class ProductTemplatesComponent extends DataTableBase {
 
  templates: KeyValue[] = [];

  constructor(private templatesService: ProductTemplatesService,
    private toastyService: ToastyService) {
      super();
      this.fetchData();
  }

  fetchData(): any {
    this.templatesService.getAll().subscribe(res => {
      this.templates = res;
      this.initializeTable(res);
    });
  } 

  filter(query: string) {
    let filtered = (query) ?
      this.templates.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.templates;

    this.initializeTable(filtered);
  }

  delete(id: number) {
    if (!confirm('Bạn có chắc chắn xóa?')) return;

    this.templatesService.delete(id).subscribe(res => {
      this.toastyService.success(DeleteSuccessMessage);
      this.fetchData();
    });

  }
}
