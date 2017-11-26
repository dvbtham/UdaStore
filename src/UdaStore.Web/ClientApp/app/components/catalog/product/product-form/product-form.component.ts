import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../../../../models/catalog/category';
import { CategoryService } from '../../../../services/catalog/category.service';
import { BrandService } from '../../../../services/catalog/brand.service';
import { DateTimPickerBase } from '../../../../date-time';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/catalog/product.service';
import { SaveSuccessMessage } from '../../../../services/app-service';
import { ProductForm, Product } from '../../../../models/catalog/product';
import { ProductOptionsService } from '../../../../services/catalog/product-options.service';
import { ProductOption } from '../../../../models/catalog/product-option';
import { Observable } from 'rxjs/Observable';
import { KeyValue } from '../../../../models/catalog/key-value';
import { ProductTemplatesService } from '../../../../services/catalog/product-templates.service';
import { ProductAttributes } from '../../../../models/catalog/product-attributes';
import { ProductTemplateSave } from '../../../../models/catalog/product-template-save';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent extends DateTimPickerBase {

  productForm: ProductForm = new ProductForm();

  categories: any[] = [];
  brands: any[] = [];
  productOptions: ProductOption[] = [];
  addingOptionJson: string = null;
  addingOption: ProductOption = new ProductOption();
  addingVariation: any = { price: 0 };
  items = [];

  productTemplates: KeyValue[] = [];
  productTemplate: KeyValue = new KeyValue();
  productTemplateJson: string = null;

  attributes: ProductAttributes[] = [];

  id: number;
  file: any;
  nativeElement: any;
  productImagesEl: any;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('productImages') productImages: ElementRef;

  constructor(private categoryService: CategoryService,
    private brandService: BrandService, private toastyService: ToastyService,
    private route: ActivatedRoute, private router: Router,
    private productService: ProductService, private optionsService: ProductOptionsService,
    private templatesService: ProductTemplatesService) {
    super();

    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).subscribe(res => this.productForm.product = res);
    this.categoryService.getCategories().subscribe(res => this.categories = res);
    this.brandService.getAll().subscribe(brands => this.brands = brands);
    this.optionsService.getAll().subscribe(res => this.productOptions = res);
    this.templatesService.getAll().subscribe(templates => this.productTemplates = templates);
  }

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };

  changeFile() {
    this.nativeElement = this.fileInput.nativeElement;
    this.file = this.nativeElement.files[0];
  }

  addProductOptions() {
    this.onModifyOption(() => {
      this.addingOption.fillFromJSON(this.addingOptionJson);
      this.productOptions.forEach(productOption => {
        productOption.values = [];
      });
      var index = this.indexOf(this.addingOption, this.productOptions);
      if (index < 0) return;
      console.log(this.addingOption);
      this.productForm.product.options.push(this.addingOption);
      this.productOptions.splice(index, 1);
      this.addingOption = new ProductOption();
      this.addingOptionJson = null;
    });
  }

  indexOf(object, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].name == object.name && array[i].id == object.id) {
        return i;
      }
    }
    return -1;
  }

  deleteOptions(option) {
    this.onModifyOption(() => {
      var index = this.indexOf(option, this.productForm.product.options);
      this.productForm.product.options.splice(index, 1);
      this.productOptions.push(option);
    });
  }

  onModifyOption(callback) {
    if (this.productForm.product.variations.length === 0) {
      callback();
      return;
    }

    if (confirm('Tất cả tùy chọn sẽ xóa. Bạn có muốn tiếp tục?')) {
      setTimeout(() => {
        this.productForm.product.variations = [];
        callback();
      }, 2);
    }
  }

  getItemValue(item) {
    return item.value;
  }

  helper(arr, optionIndex) {
    var j, l, variation, optionCombinations = [], optionValue;
    var maxIndexOption = this.productForm.product.options.length - 1;

    for (j = 0, l = this.productForm.product.options[optionIndex].values.length; j < l; j = j + 1) {
      optionCombinations = arr.slice(0);
      optionValue = {
        optionName: this.productForm.product.options[optionIndex].name,
        optionId: this.productForm.product.options[optionIndex].id,
        value: this.productForm.product.options[optionIndex].values[j],
        sortIndex: optionIndex
      };
      optionCombinations.push(optionValue);

      if (optionIndex === maxIndexOption) {
        variation = {
          name: this.productForm.product.name + ' ' + optionCombinations.map(this.getItemValue).join(' '),
          normalizedName: optionCombinations.map(this.getItemValue).join('-'),
          optionCombinations: optionCombinations,
          price: this.productForm.product.price,
          oldPrice: this.productForm.product.oldPrice
        };
        this.productForm.product.variations.push(variation);
      } else {
        this.helper(optionCombinations, optionIndex + 1);
      }
    }
  }

  generateOptionCombination() {
    this.productForm.product.variations = [];
    this.helper([], 0);
  };

  isAddVariationFormValid() {
    var i;

    for (i = 0; i < this.productForm.product.options.length; i = i + 1) {
      if (!this.addingVariation[this.productForm.product.options[i].name]) {
        return false;
      }
    }

    return true;
  };

  addVariation() {
    var variation,
      optionCombinations = [];

    this.productForm.product.options.forEach((option, index) => {
      var optionValue = {
        optionName: option.name,
        optionId: option.id,
        value: this.addingVariation[option.name],
        sortIndex: index
      };
      optionCombinations.push(optionValue);
    });

    variation = {
      name: this.productForm.product.name + ' ' + optionCombinations.map(function (item) {
        return item.value;
      }).join(' '),
      normalizedName: optionCombinations.map(function (item) {
        return item.value;
      }).join('-'),
      optionCombinations: optionCombinations,
      price: this.addingVariation.price || this.productForm.product.price,
      oldPrice: this.addingVariation.oldPrice || this.productForm.product.oldPrice,
    };

    if (!this.productForm.product.variations.find(function (item) { return item.name === variation.name; })) {
      this.productForm.product.variations.push(variation);
      this.addingVariation = { price: this.productForm.product.price };
    }
  };

  deleteVariation(variation) {
    let index = this.productForm.product.variations.indexOf(variation);
    this.productForm.product.variations.splice(index, 1);
  };

  applyTemplate() {
    this.templatesService.get(this.productTemplate.id).subscribe(response => {
      this.productForm.product.attributes = response.attributes;
    });
  }

  deleteAttribute(attribute) {
    let index = this.productForm.product.attributes.indexOf(attribute);
    this.productForm.product.attributes.splice(index, 1);
  }

  changeImages() {
    this.productImagesEl = this.productImages.nativeElement;
    this.productForm.productImages = this.productImagesEl.files;
  }

  save(option) {
    var result$ = this.id ? this.productService.updateWithFile(this.id, this.productForm, this.file) :
      this.productService.createWithFile(this.productForm, this.file);

    result$.subscribe(res => {
      this.toastyService.success(SaveSuccessMessage);

      if (option) this.router.navigate(['/products']);

    });
  }

  categoryToggle(categoryId, el) {
    if (el.target.checked) {
      this.productForm.product.categoryIds.push(categoryId);
    }
    else {
      const index = this.productForm.product.categoryIds.indexOf(categoryId);
      this.productForm.product.categoryIds.splice(index, 1);
    }

  }

}
