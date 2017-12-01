import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { ToastyService } from "ng2-toasty";

@Injectable()
export class AppService {

    BASE_END_POINT: string;
    constructor(private http: Http) {
    }

    getAll() {
        return this.http.get(this.BASE_END_POINT).map(result => result.json());
    }

    create(entity: any) {
        return this.http.post(this.BASE_END_POINT, entity).map(result => result.json());
    }
    get(id: number) {
        return this.http.get(`${this.BASE_END_POINT}/${id}`).map(result => result.json());
    }

    update(id: number, entity: any) {
        return this.http.put(`${this.BASE_END_POINT}/${id}`, entity).map(result => result.json());
    }

    delete(id: number) {
        return this.http.delete(this.BASE_END_POINT + "/" + id).map(result => result);
    }
}

export var SaveSuccessMessage = {
    title: 'Thành công',
    msg: 'Dữ liệu đã được lưu.',
    theme: 'material',
    timeout: 5000,
    showClose: true
}
export var SaveErrorMessage = {
    title: 'Lỗi',
    msg: 'Lưu thất bại vì lý do không xác định',
    theme: 'material',
    timeout: 5000,
    showClose: true
  }

export var DeleteSuccessMessage = {
    title: 'Xóa thành công',
    msg: 'Dữ liệu đã được xóa.',
    theme: 'material',
    timeout: 5000,
    showClose: true
  }