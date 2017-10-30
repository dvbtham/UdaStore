import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { BrandService } from '../../../../services/catalog/brand.service';
import { Brand } from '../../../../models/catalog/brand';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent {


  brand: Brand = new Brand();
  id: number;
  isPublished: boolean = true;

  constructor(private router: Router, private toastyService: ToastyService,
    private route: ActivatedRoute, private brandService: BrandService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) this.brandService.getBrand(this.id).subscribe(brand => this.brand = brand);
  }

  save(brand) {
    var result$ = (this.id) ? this.brandService.update(this.id, this.brand) :
      this.brandService.create(this.brand);

    result$.subscribe(res => {
      this.toastyService.success({
        title: 'Thành công',
        msg: 'Dữ liệu đã được lưu.',
        theme: 'material',
        timeout: 5000,
        showClose: true
      });
      this.router.navigate(['/brands']);
    });

  }
}
