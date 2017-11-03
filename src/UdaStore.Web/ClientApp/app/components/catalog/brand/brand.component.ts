import { Component } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { BrandService } from '../../../services/catalog/brand.service';
import { Brand } from '../../../models/catalog/brand';
import { DataTableBase } from '../../../data-table';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent extends DataTableBase {

  brands: Brand[] = [];

  constructor(private brandService: BrandService,
    private toastyService: ToastyService, ) {
    super();
    this.brandService.getAll().subscribe(items => {
      this.brands = items;
      this.initializeTable(items);
    });

  }

  filter(query: string) {
    let filtered = (query) ?
      this.brands.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.brands;

    this.initializeTable(filtered);
  }


  isPublishedToggle(id: number) {
    const brand = this.brands.find(x => x.id === id);
    brand.isPublished = !brand.isPublished;
    this.brandService.update(id, brand).subscribe();
  }

  delete(id: number) {
    if (!confirm('Bạn có chắc chắn xóa?')) return;

    this.brandService.delete(id).subscribe(res => {
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

}
