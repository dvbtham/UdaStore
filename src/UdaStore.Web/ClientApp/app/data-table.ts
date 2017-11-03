import { DataTableTranslations, DataTableResource, DataTable } from "data-table-angular-4-bootstrap-3/src";
import { ViewChild } from "@angular/core";

export class DataTableBase {
    protected tableResource = new DataTableResource([]);
    protected itemCount = 0;
    protected items: any[] = [];
    @ViewChild(DataTable) table;
    constructor() {
        this.initializeTable(this.items);
    }

    protected initializeTable(items: any[]) {
        this.tableResource = new DataTableResource(items);
    
        this.tableResource.query({ offset: 0 })
          .then(items => this.items = items);
    
        this.tableResource.count().then(count => this.itemCount = count);
      }
    
    reload(params) {
        this.tableResource.query(params).then(items => this.items = items);
      }
    
    cellColor(car) {
        return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
    };

    translations = <DataTableTranslations>{
        indexColumn: 'Thứ tự',
        expandColumn: 'Mô tả',
        selectColumn: 'Ô chọn',
        paginationLimit: 'Tối đa',
        paginationRange: 'Kết quả'
    };
}