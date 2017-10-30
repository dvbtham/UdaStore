import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentDate: any;
    constructor() {
        this.currentDate = new Date().getFullYear().toString() === "2017" ?
            new Date().getFullYear().toString() : `2017 - ${new Date().getFullYear().toString()}`;
    }
}
