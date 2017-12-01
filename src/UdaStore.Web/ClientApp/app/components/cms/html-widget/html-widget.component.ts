import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../../../services/core/widget.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SaveSuccessMessage } from '../../../services/app-service';

@Component({
  selector: 'app-html-widget',
  templateUrl: './html-widget.component.html',
  styleUrls: ['./html-widget.component.css']
})
export class HtmlWidgetComponent {

  pageTitle: string = "Thêm mới Html Widget";
  widgetInstance: any = {};
  widgetZones: any[] = [];
  id: number;

  constructor(private widgetService: WidgetService,
    private router: Router, private route: ActivatedRoute,
    private toastyService: ToastyService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) this.widgetService.getHtmlWidget(this.id).subscribe(res => {
      this.widgetInstance = res;
      this.pageTitle = "Cập nhật Html Widget";
    });
    this.widgetService.getWidgetZones().subscribe(zones => this.widgetZones = zones);
  }

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };

  save(option: boolean) {
    var result$ = this.id ? this.widgetService.editHtmlWidget(this.widgetInstance) :
      this.widgetService.createHtmlWidget(this.widgetInstance);

    result$.subscribe(() => {
      this.toastyService.success(SaveSuccessMessage);
      if (option) this.router.navigate(['/widgets']);
    });
  }

}
