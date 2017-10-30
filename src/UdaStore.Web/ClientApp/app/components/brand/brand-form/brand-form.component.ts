import { Component, OnInit } from '@angular/core';
import { Brand } from '../../../models/brand';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {

  
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

  ngOnInit() {
  }

}
