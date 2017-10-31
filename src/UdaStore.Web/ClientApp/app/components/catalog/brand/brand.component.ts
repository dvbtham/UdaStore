import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableTranslations, DataTable, DataTableResource } from 'data-table-angular-4-bootstrap-3/src';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { BrandService } from '../../../services/catalog/brand.service';
import { Brand } from '../../../models/catalog/brand';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {

  brands: Brand[] = [];
  brandResource = new DataTableResource(this.brands);
  brandCount = 0;
  items: Brand[] = [];

  @ViewChild(DataTable) brandsTable;
  constructor(private brandService: BrandService,
    private toastyService: ToastyService) {
    this.brandService.getAll().subscribe(brands => {
      this.brands = brands;
      this.initializeTable(brands);
    });

  }

  private initializeTable(brands: Brand[]) {
    this.brandResource = new DataTableResource(brands);

    this.brandResource.query({ offset: 0 })
      .then(items => this.items = items);

    this.brandResource.count().then(count => this.brandCount = count);
  }

  filter(query: string) {
    let filteredBrands = (query) ?
      this.brands.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.brands;

    this.initializeTable(filteredBrands);
  }

  reloadBrands(params) {
    this.brandResource.query(params).then(items => this.items = items);
  }

  cellColor(car) {
    return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
  };

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


  translations = <DataTableTranslations>{
    indexColumn: 'Thứ tự',
    expandColumn: 'Mô tả',
    selectColumn: 'Ô chọn',
    paginationLimit: 'Tối đa',
    paginationRange: 'Kết quả'
  };
}
