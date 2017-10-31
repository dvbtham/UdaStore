import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

export class FormSelectOption {
    id: string;
    text: string;
    children: FormSelectOption[];

    constructor(id: string, text: string, children: FormSelectOption[]) {
        this.id = id;
        this.text = text;
        this.children = children;
    }
}

@Component({
    selector: 'form-select',
    template: `
    <select class="form-control">
        <ng-template ngFor let-item [ngForOf]="items">
            <optgroup *ngIf="item.children" label="{{item.text}}">
                <option *ngFor="let child of item.children" (click)="select(child.id)">{{child.text}}</option>
            </optgroup>
            <option *ngIf="!item.children" (click)="select(item.id)">{{item.text}}</option>
        </ng-template>
    </select>
  `
})
export class FormSelectComponent {
    @Input()
    items: FormSelectOption[];

    @Input()
    selectedValue: string[];

    @Output()
    valueChange: EventEmitter<any>;

    constructor(private elementRef: ElementRef) {
        this.valueChange = new EventEmitter<any>();
    }

    select(id) {
        this.valueChange.emit(id);
    }
}