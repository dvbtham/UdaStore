import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from '../../services/core/auth.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentDate: any;
    constructor(private loader: LoadingBarService, public auth: AuthService) {
        this.currentDate = new Date().getFullYear().toString() === "2017" ?
            new Date().getFullYear().toString() : `2017 - ${new Date().getFullYear().toString()}`;
       
    }

}
