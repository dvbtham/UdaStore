import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductOptionsService } from '../../../../services/catalog/product-options.service';
import { ToastyService } from 'ng2-toasty';
import { KeyValue } from '../../../../models/catalog/key-value';

@Component({
  selector: 'app-product-options-form',
  templateUrl: './product-options-form.component.html',
  styleUrls: ['./product-options-form.component.css']
})
export class ProductOptionsFormComponent {

  productOption: KeyValue = new KeyValue();
  id: number;

  constructor(private router: Router, private toastyService: ToastyService,
    private route: ActivatedRoute, private productOptionsService: ProductOptionsService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) this.productOptionsService.get(this.id).subscribe(res => this.productOption = res);
  }
  save(brand) {
    var result$ = (this.id) ? this.productOptionsService.update(this.id, this.productOption) :
      this.productOptionsService.create(this.productOption);

    result$.subscribe(res => {
      this.toastyService.success({
        title: 'Thành công',
        msg: 'Dữ liệu đã được lưu.',
        theme: 'material',
        timeout: 5000,
        showClose: true
      });
      this.router.navigate(['/product-options']);
    });

  }

}
