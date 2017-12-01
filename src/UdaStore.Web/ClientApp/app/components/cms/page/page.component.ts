import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { PageService } from '../../../services/cms/page.service';
import { DataTableBase } from '../../../data-table';
import { DeleteSuccessMessage, SaveSuccessMessage } from '../../../services/app-service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent extends DataTableBase {

  pages: any = [];
  constructor(private toastyService: ToastyService, private pageService: PageService) {
    super();
    this.fetchPages();
  }

  fetchPages() {
    this.pageService.getAll().subscribe((res: any[]) => {
      this.pages = res;
      this.initializeTable(this.pages);
    });
  }

  delete(id: number) {
    if (!confirm("Bạn có chắc chắn xóa bản ghi này?")) return;

    this.pageService.delete(id).subscribe(() => {
      this.fetchPages();
      this.toastyService.success(DeleteSuccessMessage);
    });
  }

  isPublishedToggle(pageId) {
    let page = this.pages.find(page => page.id === pageId);
    if (page) page.isPublished = !page.isPublished;
    this.pageService.update(page.id, page).subscribe(() => {
      this.toastyService.success(SaveSuccessMessage);
    });
  }

  filter(query: string) {
    let filteredData = (query) ?
      this.pages.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.pages;

    this.initializeTable(filteredData);
  }

}
