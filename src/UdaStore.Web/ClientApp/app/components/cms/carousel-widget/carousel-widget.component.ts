import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WidgetService } from '../../../services/core/widget.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SaveSuccessMessage } from '../../../services/app-service';

@Component({
  selector: 'app-carousel-widget',
  templateUrl: './carousel-widget.component.html',
  styleUrls: ['./carousel-widget.component.css']
})
export class CarouselWidgetComponent {

  pageTitle: string = "Thêm mới Carousel Widget";
  widgetInstance = {
    items: []
  };
  widgetZones: any[] = [];
  id: number;

  nativeElement: any;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private widgetService: WidgetService,
    private router: Router, private route: ActivatedRoute,
    private toastyService: ToastyService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) this.widgetService.getCarouselWidget(this.id).subscribe(res => {
      this.widgetInstance = res;
      this.pageTitle = "Cập nhật Carousel Widget";
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

  addItem() {
    this.widgetInstance.items.push({});
  }

  files: File[] = [];

  changeFile(fileInput: any, item: any) {
    const file = fileInput.target.files[0];
    let foundItem = this.widgetInstance.items.find(x => x === item);
    foundItem.uploadImage = file;
    
  }

  removeItem(item) {
    var index = this.widgetInstance.items.indexOf(item);
    this.widgetInstance.items.splice(index, 1);
  }

  save(option: boolean) {
    var result$ = this.id ? this.widgetService.editCarouselWidget(this.widgetInstance) :
      this.widgetService.createCarouselWidget(this.widgetInstance);

    result$.subscribe(() => {
      this.toastyService.success(SaveSuccessMessage);
      if (option) this.router.navigate(['/widgets']);
    });
  }

}
