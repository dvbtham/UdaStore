import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ProductService } from '../../../services/catalog/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @ViewChild('fileInput') fileInput;
  constructor(private productService: ProductService) { }

  
}

