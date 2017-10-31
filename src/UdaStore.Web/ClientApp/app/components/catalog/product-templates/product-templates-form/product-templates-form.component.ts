import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ProductOptionsService } from '../../../../services/catalog/product-options.service';
import { ProductTemplateSave } from '../../../../models/catalog/product-template-save';
import { KeyValue } from '../../../../models/catalog/key-value';
import { ProductAttributes, ProductAttributeGroup } from '../../../../models/catalog/product-attributes';
import { ProductAttributesService } from '../../../../services/catalog/product-attributes.service';
import { ProductTemplatesService } from '../../../../services/catalog/product-templates.service';
import { Observable } from 'rxjs/Observable';
import { FormSelectOption } from '../../../../directives/select.component';
import { ProductAttributeGroupService } from '../../../../services/catalog/product-attribute-group.service';

@Component({
  selector: 'app-product-templates-form',
  templateUrl: './product-templates-form.component.html',
  styleUrls: ['./product-templates-form.component.css']
})
export class ProductTemplatesFormComponent {

  productTemplate: ProductTemplateSave = new ProductTemplateSave();
  id: number;
  addedAttributes: KeyValue[] = [];
  groups: ProductAttributeGroup[] = [];
  attributes: ProductAttributes[] = [];

  constructor(private router: Router, private toastyService: ToastyService,
    private route: ActivatedRoute, private attributeService: ProductAttributesService,
    private productTemplateService: ProductTemplatesService,
    private groupService: ProductAttributeGroupService) {

    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) this.productTemplateService.get(this.id).subscribe(res => {
      this.productTemplate = res;
      this.addedAttributes = res.attributes;
      this.populateGroups();
    });
    else
      this.populateGroups();
  }

  populateGroups() {
    var templates = this.productTemplate;
    var attributes = [];
    this.groupService.getGroups().subscribe(res => {
      this.groups = res;
      this.groups.forEach(function (group) {
        if (group.attributes.length > 0) {
          for (var index of group.attributes)
            attributes.push(index);
        }
        for (var pa of group.attributes) {
          group.attributes = group.attributes
            .filter(item => !templates.attributes.find(x => x.id == item.id));
        }
      });
    });
    this.attributes = attributes;
  }

  save(brand) {
    var result$ = (this.id) ? this.productTemplateService.update(this.id, this.productTemplate) :
      this.productTemplateService.create(this.productTemplate);

    result$.subscribe(res => {
      this.toastyService.success({
        title: 'Thành công',
        msg: 'Dữ liệu đã được lưu.',
        theme: 'material',
        timeout: 5000,
        showClose: true
      });
      this.router.navigate(['/product-templates']);
    });
  }

  selectAttribute(attributeId) {
    if (this.attributes == null || this.attributes == undefined) return;
    let attribute = this.attributes.find(x => x.id == attributeId);
    if (this.productTemplate.attributes == undefined)
      this.productTemplate.attributes = [];

    if (attribute != undefined)
      this.productTemplate.attributes.push(attribute);

    this.populateGroups();
    this.addedAttributes = this.productTemplate.attributes;
  }

  deleteAttribute(attributeId) {
    let index = this.productTemplate.attributes.indexOf(attributeId);
    this.productTemplate.attributes.splice(index, 1);
    this.populateGroups();
  }

}
