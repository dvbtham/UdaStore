import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableTranslations, DataTableResource, DataTable } from 'data-table-angular-4-bootstrap-3/src';
import { ToastyService } from 'ng2-toasty';
import { ProductAttributeGroup } from '../../../models/catalog/product-attribute-group';
import { ProductAttributeGroupService } from '../../../services/catalog/product-attribute-group.service';

@Component({
  selector: 'app-product-attribute-group',
  templateUrl: './product-attribute-group.component.html',
  styleUrls: ['./product-attribute-group.component.css']
})
export class ProductAttributeGroupComponent {

  atrributeGroups: ProductAttributeGroup[] = [];
  tableResource = new DataTableResource(this.atrributeGroups);
  itemCount = 0;
  items: ProductAttributeGroup[] = [];

  @ViewChild(DataTable) table;
  constructor(private attributeGroupService: ProductAttributeGroupService,
    private toastyService: ToastyService) {

    this.attributeGroupService.getAll().subscribe(atrributeGroup => {
      this.atrributeGroups = atrributeGroup;
      this.initializeTable(atrributeGroup);
    });

  }

  private initializeTable(atrributeGroup: ProductAttributeGroup[]) {
    this.tableResource = new DataTableResource(atrributeGroup);

    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);

    this.tableResource.count().then(count => this.itemCount = count);
  }

  filter(query: string) {
    let filteredAtrributeGroup = (query) ?
      this.atrributeGroups.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.atrributeGroups;

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
