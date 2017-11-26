import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateTimPickerBase } from '../../date-time';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent extends DateTimPickerBase{
    moment:any;        
}
