import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  @Input("items") items;
  loading: boolean = true;
  constructor(ngZone: NgZone) {

    ngZone.run(() => {
      setTimeout(() => {
        this.loading = false;
      }, 3000);

    });

  }

}
