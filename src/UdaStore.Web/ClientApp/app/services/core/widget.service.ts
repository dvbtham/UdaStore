import { Injectable } from '@angular/core';
import { AppService } from '../app-service';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';

@Injectable()
export class WidgetService extends AppService {

  constructor(httpBase: Http, private httpNew: Http) {
    super(httpBase);
    this.BASE_END_POINT = "/api/widgets";
  }

  getWidgets() {
    return this.httpNew.get('/api/widgets', { headers: this.header }).map(response => response.json());
  }

  getWidgetInstances() {
    return this.httpNew.get('/api/widget-instances', { headers: this.header }).map(response => response.json());
  }

  deleteWidgetInstance(id) {
    return this.httpNew.delete('/api/widget-instances/' + id, { headers: this.header });
  }

  getWidgetZones() {
    return this.httpNew.get('/api/widget-zones', { headers: this.header }).map(response => response.json());
  }

  getHtmlWidget(id) {
    return this.httpNew.get('/api/html-widgets/' + id, { headers: this.header }).map(response => response.json());
  }
  createHtmlWidget(widgetInstance) {
    return this.httpNew.post('/api/html-widgets', widgetInstance, { headers: this.header }).map(response => response.json());
  }
  editHtmlWidget(widgetInstance) {
    return this.httpNew.put('/api/html-widgets/' + widgetInstance.id, widgetInstance, { headers: this.header }).map(response => response.json());
  }

  getCarouselWidget(id) {
    return this.httpNew.get('api/carousel-widgets/' + id, { headers: this.header }).map(response => response.json());
  }

  createCarouselWidget(widgetInstance) {
    let formData = new FormData();
    formData.append("name", widgetInstance.name);
    formData.append("widgetZoneId", widgetInstance.widgetZoneId);
    formData.append("publishStart",  widgetInstance.publishStart ? this.convert(widgetInstance.publishStart): widgetInstance.publishStart );
    formData.append("publishEnd", widgetInstance.publishEnd ? this.convert(widgetInstance.publishEnd) : widgetInstance.publishEnd);
    formData.append("numberOfItems", widgetInstance.items.length);

    for (var i = 0; i < widgetInstance.items.length; i++) {
      formData.append('items[' + i + '][caption]', widgetInstance.items[i].caption);
      formData.append('items[' + i + '][targetUrl]', widgetInstance.items[i].targetUrl);
      formData.append('items[' + i + '][image]', widgetInstance.items[i].uploadImage.name);
      formData.append('items[' + i + '][uploadImage]', widgetInstance.items[i].uploadImage);
    }

    formData.append("formCollection", widgetInstance);
    return this.httpNew.post('api/carousel-widgets', formData, { headers: this.header }).map(response => response.json());
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  editCarouselWidget(widgetInstance) {
    let formData = new FormData();

    formData.append("name", widgetInstance.name);
    formData.append("widgetZoneId", widgetInstance.widgetZoneId);
    formData.append("publishStart",  widgetInstance.publishStart ? this.convert(widgetInstance.publishStart): widgetInstance.publishStart );
    formData.append("publishEnd", widgetInstance.publishEnd ? this.convert(widgetInstance.publishEnd) : widgetInstance.publishEnd);
    formData.append("numberOfItems", widgetInstance.items.length);

    for (var i = 0; i < widgetInstance.items.length; i++) {
      formData.append('items[' + i + '][caption]', widgetInstance.items[i].caption);
      formData.append('items[' + i + '][targetUrl]', widgetInstance.items[i].targetUrl);
      if (widgetInstance.items[i].uploadImage) {
        formData.append('items[' + i + '][image]', widgetInstance.items[i].uploadImage.name);
        formData.append('items[' + i + '][uploadImage]', widgetInstance.items[i].uploadImage);
      }
      else {
        formData.append('items[' + i + '][image]', widgetInstance.items[i].image);
      }
    }

    formData.append("formCollection", widgetInstance);
    return this.httpNew.put('api/carousel-widgets/' + widgetInstance.id, formData, { headers: this.header }).map(response => response.json());
  }

}
