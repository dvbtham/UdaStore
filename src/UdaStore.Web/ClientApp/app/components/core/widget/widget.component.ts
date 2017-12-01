import { Component, OnInit } from '@angular/core';
import { DataTableBase } from '../../../data-table';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { WidgetService } from '../../../services/core/widget.service';
import { DeleteSuccessMessage } from '../../../services/app-service';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css']
})
export class WidgetComponent extends DataTableBase {
    widgetInstances: any[] = [];
    widgets: any[] = [];

    constructor(private toastyService: ToastyService,
        private widgetService: WidgetService) {
        super();
        this.fetchWidgetInstance();
        this.widgetService.getWidgets().subscribe(res => {
            for (let i = 0; i < res.length; i++) {
                if(res[i].id != 3){
                    this.widgets.push(res[i]);
                }
            }
        });

    }

    fetchWidgetInstance() {
        this.widgetService.getWidgetInstances().subscribe((res: any[]) => {
            this.widgetInstances = res;
            this.initializeTable(this.widgetInstances);
        });
    }

    delete(id: number) {
        if (!confirm("Bạn có chắc chắn xóa bản ghi này?")) return;

        this.widgetService.deleteWidgetInstance(id).subscribe(() => {
            this.fetchWidgetInstance();
            this.toastyService.success(DeleteSuccessMessage);
        });
    }

    filter(query: string) {
        let filteredData = (query) ?
            this.widgetInstances.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
            this.widgetInstances;

        this.initializeTable(filteredData);
    }
}
