import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductAttributeGroupService } from '../../../../services/catalog/product-attribute-group.service';
import { ToastyService } from 'ng2-toasty';
import { KeyValue } from '../../../../models/catalog/key-value';

@Component({
  selector: 'app-product-attribute-group-form',
  templateUrl: './product-attribute-group-form.component.html',
  styleUrls: ['./product-attribute-group-form.component.css']
})
export class ProductAttributeGroupFormComponent {

  atrributeGroup: KeyValue = new KeyValue();
  id: number;

  constructor(private router: Router, private toastyService: ToastyService,
    private route: ActivatedRoute, private attrGroupService: ProductAttributeGroupService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) this.attrGroupService.get(this.id).subscribe(res => this.atrributeGroup = res);
  }
  save(brand) {
    var result$ = (this.id) ? this.attrGroupService.update(this.id, this.atrributeGroup) :
      this.attrGroupService.create(this.atrributeGroup);

    result$.subscribe(res => {
      this.toastyService.success({
        title: 'Thành công',
        msg: 'Dữ liệu đã được lưu.',
        theme: 'material',
        timeout: 5000,
        showClose: true
      });
      this.router.navigate(['/product-attribute-group']);
    });

  }

}
