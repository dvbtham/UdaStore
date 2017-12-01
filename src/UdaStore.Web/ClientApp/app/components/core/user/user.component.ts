import { Component, OnInit } from '@angular/core';
import { DataTableBase } from '../../../data-table';
import { UserService } from '../../../services/core/user.service';
import { ToastyService } from 'ng2-toasty';
import { DeleteSuccessMessage } from '../../../services/app-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends DataTableBase {
  users: any[] = [];
  colunm: string = "fullName";
  constructor(private userService: UserService,
    private toastyService: ToastyService, private router: Router) {
    super();
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
      this.initializeTable(users);
    });
  }

  filter(query: string) {
    let filteredData: any[] = [];
    if (query) {
      switch (this.colunm) {
        case "email": filteredData = this.users.filter(x => x.email.toLowerCase()
          .includes(query.toLocaleLowerCase()));
          break;
        case "roles": filteredData = this.users.filter(x => x.roles.toLowerCase()
          .includes(query.toLocaleLowerCase()));
          break;
        default: filteredData = this.users.filter(x => x.fullName.toLowerCase()
          .includes(query.toLocaleLowerCase()));
          break;
      }
    }
    else filteredData = this.users;

    this.initializeTable(filteredData);
  }

  searchByColunm(colunm: string) {
    this.colunm = colunm;
  }

  delete(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      this.userService.delete(id).subscribe(result => {
        this.toastyService.success(DeleteSuccessMessage);
        this.fetchUsers();
      });
    }
    else
      return;
  }

}
