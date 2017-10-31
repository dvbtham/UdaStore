import { Component, OnInit } from '@angular/core';
import { ProductAttributesSave } from '../../../../models/catalog/product-attributes';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductAttributesService } from '../../../../services/catalog/product-attributes.service';
import { ToastyService } from 'ng2-toasty';
import { ProductAttributeGroupService } from '../../../../services/catalog/product-attribute-group.service';
import { KeyValue } from '../../../../models/catalog/key-value';

@Component({
  selector: 'app-product-attribute-form',
  templateUrl: './product-attribute-form.component.html',
  styleUrls: ['./product-attribute-form.component.css']
})
export class ProductAttributeFormComponent {

  productAttribute: ProductAttributesSave = {
    id: 0,
    name: "",
    groupId: 0
  };
  id: number;
  groups: KeyValue[] = [];

  constructor(private router: Router, private toastyService: ToastyService,
    private route: ActivatedRoute, private productAttrGroupService: ProductAttributeGroupService,
    private productAttrService: ProductAttributesService) {
    this.productAttrGroupService.getAll().subscribe(groups => this.groups = groups);
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) this.productAttrService.get(this.id).subscribe(res => this.productAttribute = res);
  }
  save(brand) {
    var result$ = (this.id) ? this.productAttrService.update(this.id, this.productAttribute) :
      this.productAttrService.create(this.productAttribute);

    result$.subscribe(res => {
      this.toastyService.success({
        title: 'Thành công',
        msg: 'Dữ liệu đã được lưu.',
        theme: 'material',
        timeout: 5000,
        showClose: true
      });
      this.router.navigate(['/product-attributes']);
    });

  }

}
