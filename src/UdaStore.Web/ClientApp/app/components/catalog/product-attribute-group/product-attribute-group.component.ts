import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ProductAttributeGroupService } from '../../../services/catalog/product-attribute-group.service';
import { KeyValue } from '../../../models/catalog/key-value';
import { DataTableBase } from '../../../data-table';
import { DeleteSuccessMessage } from '../../../services/app-service';

@Component({
  selector: 'app-product-attribute-group',
  templateUrl: './product-attribute-group.component.html',
  styleUrls: ['./product-attribute-group.component.css']
})
export class ProductAttributeGroupComponent extends DataTableBase {

  atrributeGroups: KeyValue[] = [];

  constructor(private attributeGroupService: ProductAttributeGroupService,
    private toastyService: ToastyService) {
    super();
    this.fetchData();

  }

  fetchData() {
    this.attributeGroupService.getAll().subscribe(atrributeGroup => {
      this.atrributeGroups = atrributeGroup;
      this.initializeTable(atrributeGroup);
    });
  }

  filter(query: string) {
    let filteredAtrributeGroup = (query) ?
      this.atrributeGroups.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.atrributeGroups;

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
