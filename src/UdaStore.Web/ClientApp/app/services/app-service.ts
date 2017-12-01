import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { ToastyService } from "ng2-toasty";
import { UserProfile } from "../models/core/user";

@Injectable()
export class AppService {

    protected currentUser = localStorage.getItem("currentUser");
    protected header = new Headers();
    protected user = new UserProfile();

    BASE_END_POINT: string;
    constructor(private http: Http) {
        if (this.currentUser) {
            this.user.fillFromJSON(localStorage.getItem('currentUser'));
            this.header.append("Authorization", "Bearer " + this.user.token);
        }
    }

    getAll() {
        return this.http.get(this.BASE_END_POINT, { headers: this.header }).map(result => result.json());
    }

    create(entity: any) {
        return this.http.post(this.BASE_END_POINT, entity, { headers: this.header }).map(result => result.json());
    }
    get(id: number) {
        return this.http.get(`${this.BASE_END_POINT}/${id}`, { headers: this.header }).map(result => result.json());
    }

    update(id: number, entity: any) {
        return this.http.put(`${this.BASE_END_POINT}/${id}`, entity, { headers: this.header }).map(result => result.json());
    }

    delete(id: number) {
        return this.http.delete(this.BASE_END_POINT + "/" + id, { headers: this.header }).map(result => result);
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