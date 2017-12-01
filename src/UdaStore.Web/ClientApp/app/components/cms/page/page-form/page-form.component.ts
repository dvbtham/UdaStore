import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService } from '../../../../services/cms/page.service';
import { SaveSuccessMessage } from '../../../../services/app-service';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.css']
})
export class PageFormComponent {

  page = {};
  private id: number;
  constructor(private router: Router, private route: ActivatedRoute,
    private toastyService: ToastyService, private pageService: PageService) {
    this.id = +this.route.snapshot.paramMap.get("id");
    if (this.id) this.pageService.get(this.id).subscribe(res => this.page = res);
  }

  save(option) {
    let result$ = this.id ? this.pageService.update(this.id, this.page) :
      this.pageService.create(this.page);

    result$.subscribe(() => {
      this.toastyService.success(SaveSuccessMessage);
      if (option) this.router.navigate(['/pages']);
    });
  }
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };

}
