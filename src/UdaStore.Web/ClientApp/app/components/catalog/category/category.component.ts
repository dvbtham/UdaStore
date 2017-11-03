import { Component } from '@angular/core';
import { CategoryService } from '../../../services/catalog/category.service';
import { ToastyService } from 'ng2-toasty';
import { DataTableBase } from '../../../data-table';
import { DeleteSuccessMessage } from '../../../services/app-service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends DataTableBase {

  categories: any[] = [];

  constructor(private categoryService: CategoryService,
    private toastyService: ToastyService) {
    super();
    this.categoryService.getAll().subscribe(res => {
      this.categories = res;
      this.initializeTable(res);
    });

  }

  filter(query: string) {
    let filteredData = (query) ?
      this.categories.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.categories;

    this.initializeTable(filteredData);
  }

  isPublishedToggle(id: number) {
    const category = this.categories.find(x => x.id == id);
    if (category != null) {
      category.isPublished = !category.isPublished;
      this.categoryService.update(id, category).subscribe();
    }

  }

  delete(id: number) {
    if (!confirm('Bạn có chắc chắn xóa?')) return;

    this.categoryService.delete(id).subscribe(res => {
      this.toastyService.success(DeleteSuccessMessage);
      this.initializeTable(this.categories);
    });

  }
}
