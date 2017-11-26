import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../../services/core/role.service';
import { KeyValue } from '../../../../models/catalog/key-value';
import { User } from '../../../../models/core/user';
import { UserService } from '../../../../services/core/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SaveSuccessMessage } from '../../../../services/app-service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  roles: KeyValue[] = [];
  user: User = new User();
  roleIds: any[] = [];
  id: number;
  constructor(private roleService: RoleService,
    private route: ActivatedRoute, private router: Router,
    private toastyService: ToastyService,
    private userService: UserService) {

    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) this.userService.get(this.id).subscribe(user => this.user = user);
    this.roleService.getAll().subscribe(roles => this.roles = roles);
  }

  onRoleToggle(roleId: any, $event: any) {
    if ($event.target.checked)
      this.user.roleIds.push(roleId);
    else {
      const index = this.user.roleIds.indexOf(roleId);
      this.user.roleIds.splice(index, 1);
    }
  }

  save() {
    var result$ = (this.id) ? this.userService.update(this.id, this.user) :
      this.userService.create(this.user);

    result$.subscribe(result => {
      this.toastyService.success(SaveSuccessMessage);
      this.router.navigate(['/users']);
    })
  }

}
