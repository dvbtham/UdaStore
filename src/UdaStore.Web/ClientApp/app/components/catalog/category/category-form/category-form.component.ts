import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../../../../models/catalog/category';
import { CategoryService } from '../../../../services/catalog/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import {
  SaveSuccessMessage,
  SaveErrorMessage
}
  from '../../../../services/app-service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  @ViewChild('fileInput') fileInput: ElementRef;
  category: Category = new Category();
  categories: Category[] = [];
  id: number;
  file: any;
  nativeElement: any;
  constructor(private categoryService: CategoryService,
    private toastyService: ToastyService,
    private route: ActivatedRoute, private router: Router) {
    this.id = +this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.categoryService.get(this.id).subscribe(res => this.category = res);
    }
    this.categoryService.getCategories().subscribe(items => {
      this.categories = items.filter(x => x.id != this.id);
    });
  }
  save() {
    this.category.thumbnailImage = null;
    var result$ = (this.id) ? this.categoryService.update(this.id, this.category) :
      this.categoryService.create(this.category);

    result$.subscribe(res => {
      this.toastyService.success(SaveSuccessMessage);
      this.router.navigate(['/categories']);
    }, error => {
      this.toastyService.error(SaveErrorMessage);
    })
  }
  changeFile() {
    this.nativeElement = this.fileInput.nativeElement;
    this.file = this.nativeElement.files[0];
    this.category.thumbnailImage = this.file;

  }
  uploadPhoto() {
    this.categoryService.uploadPhoto(this.id, this.file)
      .subscribe(res => {
        this.toastyService.success(SaveSuccessMessage);
        this.categoryService.get(this.id).subscribe(res => this.category = res);
      }, error => {
        this.toastyService.error({
          title: 'Lỗi',
          msg: error.text(),
          theme: 'material',
          timeout: 5000,
          showClose: true
        })
      });
      this.nativeElement.value = '';
  }
}
